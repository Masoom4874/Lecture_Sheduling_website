import React from "react";

const CourseItem = ({ name, level, description, image }) => {
  return (
    <div className="course-item">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Level: {level}</p>
      <p>{description}</p>
    </div>
  );
};

export default CourseItem;
