import React from "react";
import Course from "./Course";

const View = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </div>
  );
};

export default View;
