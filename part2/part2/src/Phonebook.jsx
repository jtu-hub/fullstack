import { useState } from "react";



const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')

    const inputName = "phonebook-name";

    let formSubmitt = (event) => {
        event.preventDefault();
        let name = event.target.elements[inputName].value.trim();

        let newEntry = {
            id: name.replace(/ /g, "-"),
            name: name,
            phone: undefined
        };

        if(!persons.find(p => p.id === newEntry.id))
            setPersons(persons.concat(newEntry));
        else
            alert("Entry with name " + name + " already exists");
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={formSubmitt}>
                <div>
                    <input name={inputName} placeholder="Name" />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(p => <li key={p.id}>{p.name}{p.phone ? ": " + p.phone : ""}</li>)}
            </div>
        </div>
    )
}

export default App;