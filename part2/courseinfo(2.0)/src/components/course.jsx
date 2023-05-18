import React from 'react';

const Header = (props) => {
    return <h2>{props.title}</h2>;
  };
  
  const Total = ({ exercises }) => {
    const totalExercises = exercises.reduce((a, v) => a + v.exercises, 0);
    return <h3>Number of exercises: {totalExercises.toString()}</h3>;
  };
  
  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    );
  };

const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };


const Course = ({course}) => { 
    return (
      <div>
        <h1>Web Development Curriculum</h1>
        {course.map((course) => (
  
            <div key={course.id}>

            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts} />

            </div>
           
    
           
        ))}
      </div>
    );
  };



export default Course