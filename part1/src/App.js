import React, { useState } from "react";

const Button = ({ setHandler, name }) => {
  return <button onClick={setHandler}> {name}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average_score = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive_percentage = (good / total) * 100;

  if (total > 0)
    return (
      <>
        <h2>Give feedback</h2>
        <Button setHandler={() => setGood(good + 1)} name="good" />
        <Button setHandler={() => setNeutral(neutral + 1)} name="neutral" />
        <Button setHandler={() => setBad(bad + 1)} name="bad" />
        <h2>statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="total" value={total} />
            <Statistic text="average" value={average_score} />
            <Statistic text="positive" value={positive_percentage + " %"} />
          </tbody>
        </table>
      </>
    );
  else
    return (
      <>
        <h2>Give feedback</h2>
        <Button setHandler={() => setGood(good + 1)} name="good" />
        <Button setHandler={() => setNeutral(neutral + 1)} name="neutral" />
        <Button setHandler={() => setBad(bad + 1)} name="bad" />
        <p>No feedback given</p>
      </>
    );
};

export default App;
