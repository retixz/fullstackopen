import React, { useState, useEffect, cloneElement } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsDisplay from "./components/PersonsDisplay";
import Error from "./components/Error";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newResults, setNewResults] = useState([{}]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const newEntry = (event) => {
    event.preventDefault();
    if (
      persons.find(
        (person) => person.name === newName || person.number === newNumber
      )
    ) {
      // Check if already exists in phonebook
      persons.forEach((person) => {
        if (person.name === newName && person.number !== newNumber) {
          if (
            window.confirm(
              `${newName} is already added to phonebook do you want to update the old number?`
            )
          ) {
            const newObject = { ...person, number: newNumber };
            personService
              .updateNumber(person.id, newObject)
              .then((updatedPerson) => {
                setPersons(
                  persons.map((person) =>
                    person.name !== newName ? person : updatedPerson
                  )
                );
              })
              .catch((error) => {
                setErrorMessage(error.response.data.error);
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              });
          }
        } else if (person.name !== newName && person.number === newNumber) {
          setErrorMessage(`${newNumber} is already added to phonebook`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      });
    } else {
      // Add new person
      const person = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(person)
        .then((response) => {
          //Create new person and update UI
          setPersons(persons.concat(person));
          personService.getAll().then((persons) => setPersons(persons));
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
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

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`
      )
    )
      personService.deleteEntry(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id)); //delete from all persons display
        setNewResults(newResults.filter((person) => person.id !== id)); //delete from search result display
      });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filter = event.target.value.toUpperCase();
    const results = persons.filter((person) =>
      person.name.toUpperCase().includes(filter)
    );

    if (results) setNewResults(results);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} />
      <PersonForm
        newEntry={newEntry}
        newName={newName}
        handleName={handleName}
        handleNumber={handleNumber}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Error message={errorMessage} />

      {newResults && search ? (
        <PersonsDisplay persons={newResults} handleDelete={handleDelete} /> //Display search results
      ) : (
        <PersonsDisplay persons={persons} handleDelete={handleDelete} /> //Display all persons
      )}
    </div>
  );
};

export default App;
