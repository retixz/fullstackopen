import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newResults, setNewResults] = useState([{}]);
  const [search, setSearch] = useState("");

  const newEntry = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      // Check if already exists in phonebook
      alert(`${newName} is already added to phonebook`);
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      // Add new person
      const person = { name: newName, number: newNumber };
      setPersons(persons.concat(person));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const filter = event.target.value.toUpperCase();
    const results = persons.filter((person) =>
      person.name.toUpperCase().includes(filter)
    );

    setSearch(filter);
    if (results) setNewResults(results);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        search : <input onChange={handleSearch} />
      </div>
      <form onSubmit={newEntry}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newResults && search ? (
        <div>
          {" "}
          <ul>
            {newResults.map((result, i) => (
              <li key={i}>
                {result.name} {result.number}{" "}
              </li>
            ))}
          </ul>{" "}
        </div>
      ) : (
        <ul>
          {persons.map((person, i) => (
            <li key={i}>
              {person.name} {person.number}{" "}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
