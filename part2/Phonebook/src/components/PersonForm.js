import React from "react";

const PersonForm = ({
  newEntry,
  newName,
  handleName,
  newNumber,
  handleNumber,
}) => {
  return (
    <>
      <h2>add a new</h2>
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
    </>
  );
};

export default PersonForm;
