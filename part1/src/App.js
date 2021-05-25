import React from "react";
import Header from "./Header.js";
import Total from "./Total.js";
import Part from "./Part.js";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Part course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
