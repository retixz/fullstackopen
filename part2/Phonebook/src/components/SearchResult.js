import React from "react";

const SearchResult = ({ newResults }) => {
  return (
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
  );
};

export default SearchResult;
