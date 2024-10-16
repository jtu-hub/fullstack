import { useState } from "react";

const phoneNumberFormat = {
    "+41":  /^(0{2}|\+)41\s?(\(0\))?\s?\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/, // To meet your friend for znüni
    "+46":  /^(0{2}|\+)46\s?\(?\d{1,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/,              // To meet your friend for fika 
};

const TextInput = ({value, placeholder, name, alert}) => {

    let dataIsValid = alert === `` && value !== ``;
    let displayNumberAlert = dataIsValid ? {display: "none"} : {color:"red", display: "block"};

    return (
        <div>
            <span style={displayNumberAlert}>{alert}<br /></span>
            <input data-is-valid={dataIsValid} name={name} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

const PhoneNumberInput = ({name}) => {
    const [newNumber, setNewNumber] = useState({number: ``})
    
    const handleNewNumber = (event) => {
        let val = event.target.value;

        val = val.replace(/^0{2}/, `+`)

        let key = (Object.keys(phoneNumberFormat).filter((key) => val.startsWith(key)))[0];
        
        let numberAlert = ``;
        if(key && !phoneNumberFormat[key].test(val)) 
            numberAlert = `Invalid number format for selected country code`;
        else if(newNumber.number === ``)
            numberAlert = `*A number is required`
        else if(!key)
            numberAlert = `Unknown coutry code`
        
        setNewNumber({number: val.replace(/[^+0-9\-\s\(\)]/g, ''), numberAlert: numberAlert});
    }
    
    let dataIsValid = newNumber.numberAlert === `` && newNumber.number !== ``;
    let displayNumberAlert = dataIsValid ? {display: "none"} : {color:"red", display: "block"};

    return (
        <div>
            <span style={displayNumberAlert}>{newNumber.numberAlert}<br /></span>
            <input data-is-valid={dataIsValid} name={name} value={newNumber.number} onChange={handleNewNumber} placeholder="Your Phonenumber <3" />
        </div>
    )
}

const NameInput = ({name, placeholder = "Name"}) => {
    const [newName, setNewName] = useState({name: ``, nameAlert: ``})

    const handleNewName = (event) => {
        let val = event.target.value;

        let nameAlert = ``;
        if((/\d/).test(val) || (/[+\-*/%^]/).test(val))
            if(( /^\d+$/).test(val))
                nameAlert = `To us, you're much more than just a number, please enter name`;
            else 
                nameAlert = `We're not doing algebra here, please enter your name`;

        setNewName({name: val, nameAlert: nameAlert});
    } 

    let dataIsValid = newName.nameAlert === `` && newName.name !== ``;
    let displayNameAlert = dataIsValid ? {display: "none"} : {color:"red", display: "block"};

    return (
        <div>
            <span style={displayNameAlert}>{newName.nameAlert}<br /></span>
            <input data-is-valid={dataIsValid} name={name} value={newName.name} onChange={handleNewName} placeholder={placeholder} />
        </div>
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