import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const MostLiked = ({points, anecdotes}) => {

  let max = points[0];
  let position = 0;

  for (let i = 1; i < points.length; i++) {
    if (points[i] > max) {
        max = points[i]
        position = i;
    }

  }

  return(
   
    <>
    <h1>Anecdote Most View</h1>
    <p>{anecdotes[position]}</p>
    <h3>has {max} votes</h3>
    </>

  )

}

const Anecdote = ({anecdotes, points, selected}) =>{
return(
  <>
  <h1>Anecdote of the day</h1>
  <p>{anecdotes[selected]}</p> 
  <h3>has {points[selected]} votes</h3>
  
  </>
)
}

const Button = ({ handleClick, names }) => {
  return <button onClick={handleClick}>{names}</button>;
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const buttons = ["vote", "next anecdote"];


  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const voteClick =() =>{
    let copy = [...points]
    copy[selected]++ 
    return(
      setPoints(copy)
    )
  };

  const anecClick = () => {
   
    return setSelected(getRandomInt(anecdotes.length))
  };

  return (
    <div>
      <Anecdote anecdotes={anecdotes} points={points} selected={selected}/>
      <Button handleClick={voteClick} names={buttons[0]} />
      <Button handleClick={anecClick} names={buttons[1]} />
      <MostLiked points={points} anecdotes={anecdotes}/>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

createRoot(document.getElementById("root")).render(
  <App anecdotes={anecdotes} />
);
