import React from "react";

const PersonsDisplay = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) =>
        person.id ? (
          <div key={person.id}>
            <li>
              {person.name} {person.number}{" "}
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </li>
          </div>
        ) : null
      )}
    </ul>
  );
};

export default PersonsDisplay;
