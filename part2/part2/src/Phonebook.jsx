import { useState } from "react";

/**
 * 
 * @param {placeholder} string Text that is displayed when the input is empty
 * @param {name} string Name of the input
 * @param {validateInput} function (value) => {value, alert} The function used to validate the user's input passed as argument. It must return an object with the two properties as described {value, alert} 
 * @returns a form element composed of an input field and a alert span, the input is considered to be valid if the alert is an empty string
 */
const TextInput = ({name, placeholder = "", validateInput = undefined}) => {
    const [newValue, setNewValue] = useState({[name]: ``, [`{name}Alert`]: ``})
    
    const handleNewValue = (event) => {
        let val = event.target.value;

        let {value, alert} = validateInput ? validateInput(val) : ((value) => {return {value: value, alert: ``}})(val);

        setNewValue({[name]: value, [`{name}Alert`]: alert});
    }

    let dataIsValid = newValue[`{name}Alert`] === `` && newValue[name] !== ``;
    let displayNumberAlert = dataIsValid ? {display: "none"} : {color:"red", display: "block"};

    return (
        <div>
            <span style={displayNumberAlert}>{newValue[`{name}Alert`]}<br /></span>
            <input data-is-valid={dataIsValid} name={name} value={newValue[name]} onChange={handleNewValue} placeholder={placeholder} />
        </div>
    )
}

const phoneNumberFormats = {
    "+41":  /^(0{2}|\+)41\s?(\(0\))?\s?\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/, // To meet your friend for znüni
    "+46":  /^(0{2}|\+)46\s?\(?\d{1,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/,              // To meet your friend for fika 
};

const PhoneNumberInput = ({name, required = true, placeholder = "Your phone-number <3"}) => {    
    const validatePhoneNumber = (value) => {
        value = value.replace(/^0{2}/, `+`)

        let key = (Object.keys(phoneNumberFormats).filter((key) => value.startsWith(key)))[0];
        
        let alert = ``;
        if(required && value === ``)
            alert = `*A number is required`
        else if(key && !phoneNumberFormats[key].test(value)) 
            alert = `Invalid number format for selected country code`;
        else if(!key)
            alert = `Unknown coutry code`
        
        return {value: value.replace(/[^+0-9\-\s\(\)]/g, ''), alert: alert};
    }
    
    return (
        <TextInput name={name} validateInput={validatePhoneNumber} placeholder={placeholder}/>
    )
}

const NameInput = ({name, required = true, placeholder = "Enter Name..."}) => {
    const validateName = (value) => {
        let alert = ``;
        
        if(required && value === "")
            alert = `*A name is required`
        else if((/\d/).test(value) || (/[+\-*/%^]/).test(value))
            if(( /^\d+$/).test(value))
                alert = `To us, you're much more than just a number, please enter name`;
            else 
                alert = `We're not doing algebra here, please enter your name`;

        return {value: value, alert: alert};
    } 

    return (
        <TextInput name={name} validateInput={validateName} placeholder={placeholder}/>
    )
}

const SubmitButton = ({label = "Submit"}) => {
    return (
        <>
        <div>
            <button type="submit">{label}</button>
        </div>
        </>
    )
}

/**
 * A form which autocompiles on submit the values of the provided inputs into an entry object which can be processed with the processNewEntry function
 * @param {inputList} List list of inputs that compose the form, requires at leas a submit button, for the input value to be added to the entry object it must have the name attribute set
 * @param {processNewEntry} function (newEntry) => {} The function used to process the entry of the form upon a form-submitt, leave undefined if you want to see how the newEntry looks like in the console
 * @returns a form with the provided input fields
 */
const Form = ({inputList, processNewEntry = undefined}) => {
    const onFormSubmit = (event) => {
        event.preventDefault();

        let formElements = [...event.target.elements];

        let newEntry = formElements.reduce(
            (res, element) => {
                if(element.name !== ``) {
                    res = {
                        ...res,
                        [element.name]: element.value,
                        id: [res.id, element.value.replace(/[^a-zA-Z0-9]/g,``)].join(`-`).slice(0,30),
                        isValid: element.attributes["data-is-valid"] === undefined ? res.isValid : res.isValid && element.attributes["data-is-valid"].value === "true"
                    };
                }
                return res;
            },
            {id: `id`, isValid: true}
        );
        
        processNewEntry ? processNewEntry(newEntry) : ((entry) => {console.log(entry)})(newEntry);
    }

    return (
        <>
            <form onSubmit={onFormSubmit}>
                {inputList}
            </form>
        </>
    )
}

const App = () => {
    //define form elements
    const inputName = "phonebook-name";
    const inputPhone = "phonebook-number";

    const inputList = [
        <NameInput name={inputName} key={inputName} />,
        <PhoneNumberInput name={inputPhone} key={inputPhone} />,
        <SubmitButton />
    ]
    
    //define form process function for new entries
    const [persons, setPersons] = useState([]) 
    const processNewEntry = (newEntry) => {
        if(!newEntry.isValid)
            alert(`Form is invalid`);
        else if(persons.find(p => p[inputPhone] === newEntry[inputPhone]))
            alert(`Entry with number ${newEntry[inputPhone]} already exists`);
        else
            setPersons(persons.concat(newEntry)); 
    }
    //define filter callback
    const [filter, setFilter] = useState("")

    return (
        <div>
            <h2>Phonebook</h2>
            <Form inputList={inputList} processNewEntry={processNewEntry}/>
            <h2>Numbers</h2>
            <div>
                <p>Filter: <input type="text" onChange={(event) => setFilter(event.target.value)}/></p>
            </div>
            <div>
                {persons.map(
                    (p) => {
                        if(filter === `` || p[inputName].toLowerCase().includes(filter.toLowerCase()) || p[inputPhone].toLowerCase().includes(filter.toLowerCase()))
                            return <li key={p.id}>{p[inputName]}{p[inputPhone] ? `: ${p[inputPhone]}` : ``}</li>
                    }
                )}
            </div>
        </div>
    );
}

export default App;