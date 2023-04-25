import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Statistic = ({
  statistic,
  good,
  bad,
  neutral,
  noStats,
  total,
  average,
  positive,
}) => {
  if (noStats !== "") {
    return (
      <>
        <StatisticTitle value={statistic} />
        <h3>{noStats}</h3>
      </>
    );
  } else {
    return (
      <>
        <StatisticTitle value={statistic} />
        <table>
          <tbody>
        y<StatisticLine text="good" value={good} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="TOTAL" value={total} />
        <StatisticLine text="AVERAGE" value={average} />
        <StatisticLine text="POSITIVE" value={positive} />
          </tbody>
        </table>
      </>
    );
  }
};

const StatisticTitle = ({ text, value }) => {
  return <h2>{value}</h2>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const title = "Give Feedback";
  const stats = "Statistics";
  let totalClicks = "";
  let total = good + neutral + bad;
  let average = (good - bad) / total;
  let positive = (good / total) * 100;

  const handleClick = (click, setClick) => {
    setClick(click + 1);
  };

  //To show Statics / No feedback
  if (total === 0) {
    totalClicks = "No feedback given";
  }

  return (
    <div>
      <Title title={title} />
      <Button name="Good" handleClick={() => handleClick(good, setGood)} />
      <Button
        name="Neutral"
        handleClick={() => handleClick(neutral, setNeutral)}
      />
      <Button name="Bad" handleClick={() => handleClick(bad, setBad)} />
      <Statistic
        statistic={stats}
        good={good}
        bad={bad}
        neutral={neutral}
        noStats={totalClicks}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
