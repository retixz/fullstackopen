import React, { useState } from "react";

const View = ({ buttonHandler, anecdotes, best }) => {
  return (
    <>
      <button onClick={buttonHandler}>vote</button>
      <h1>Anecdote with most vote</h1>
      <p>{anecdotes[best]}</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(6).fill(0));
  const [best, setBest] = useState(0);

  const buttonHandler = () => {
    const newVote = vote.map((item, index) => {
      if (index === selected) {
        item++;
      }
      return item;
    });

    console.log(newVote.best);

    setVote(newVote);
    console.log(vote);
    setBest(vote.indexOf(Math.max(...vote)));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has: {vote[selected]} votes</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>
        another one
      </button>
      <View buttonHandler={buttonHandler} anecdotes={anecdotes} best={best} />
    </div>
  );
};

export default App;
