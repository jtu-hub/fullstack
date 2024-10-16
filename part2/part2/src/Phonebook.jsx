import { useState } from "react";

/**
 * 
 * @param {placeholder} string Text that is displayed when the input is empty
 * @param {name} string Name of the input
 * @param {validateInput} function (value) => {value, alert} The function used to validate the user's input passed as argument. It must return an object with the two properties as described {value, alert} 
 * @returns a form element composed of an input field and a alert span
 */
const TextInput = ({placeholder, name, validateInput = undefined}) => {
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

const phoneNumberFormat = {
    "+41":  /^(0{2}|\+)41\s?(\(0\))?\s?\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/, // To meet your friend for znüni
    "+46":  /^(0{2}|\+)46\s?\(?\d{1,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/,              // To meet your friend for fika 
};

const PhoneNumberInput = ({name, placeholder = "Your phone-number <3"}) => {    
    const validatePhoneNumber = (value) => {
        value = value.replace(/^0{2}/, `+`)

        let key = (Object.keys(phoneNumberFormat).filter((key) => value.startsWith(key)))[0];
        
        let alert = ``;
        if(key && !phoneNumberFormat[key].test(value)) 
            alert = `Invalid number format for selected country code`;
        else if(value === ``)
            alert = `*A number is required`
        else if(!key)
            alert = `Unknown coutry code`
        
        return {value: value.replace(/[^+0-9\-\s\(\)]/g, ''), alert: alert};
    }
    
    return (
        <TextInput name={name} validateInput={validatePhoneNumber} placeholder={placeholder}/>
    )
}

const NameInput = ({name, placeholder = "Enter Name..."}) => {
    const validateName = (value) => {
        let alert = ``;
        if((/\d/).test(value) || (/[+\-*/%^]/).test(value))
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

const Form = ({inputList, onFormSubmit}) => {
    return (
        <>
            <form onSubmit={onFormSubmit}>
                {inputList}
            </form>
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([]) 

    const inputName = "phonebook-name";
    const inputPhone = "phonebook-number";

    const inputList = [
        <NameInput name={inputName} key={inputName} />,
        <PhoneNumberInput name={inputPhone} key={inputPhone} />,
        <SubmitButton />
    ]
    
    const onFormSubmit = (event) => {
        event.preventDefault();

        let formElements = [...event.target.elements];

        let newEntry = formElements.reduce(
            (res, element) => {
                if(element.name !== ``) {
                    console.log(res.isValid, element, element.attributes["data-is-valid"] === undefined, res.isValid, res.isValid && element.attributes["data-is-valid"].value === "true" );
                    
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
        
        if(!newEntry.isValid)
            alert(`Form is invalid`);
        else if(persons.find(p => p.id === newEntry.id))
            alert(`Entry with id ${newEntry.id} already exists`);
        else
            setPersons(persons.concat(newEntry));   
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Form inputList={inputList} onFormSubmit={onFormSubmit}/>
            <h2>Numbers</h2>
            <div>
                {persons.map(p => <li key={p.id}>{p[inputName]}{p[inputPhone] ? `: ${p[inputPhone]}` : ``}</li>)}
            </div>
        </div>
    );
}

export default App;