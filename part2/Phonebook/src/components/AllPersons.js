import React from "react";

const AllPersons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, i) => (
        <li key={i}>
          {person.name} {person.number}{" "}
        </li>
      ))}
    </ul>
  );
};

export default AllPersons;
