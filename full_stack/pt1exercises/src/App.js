import { useState } from 'react';
import './App.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);

  const selectRandomQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={selectRandomQuote}>next anecdote</button>
    </div>
  )
}

export default App;


// part 1 - feedback
// const Title = ({ text }) => <h1>{text}</h1>;

// const StatLine = ({ text, stat }) => <tr><td>{text}</td><td>{stat}</td></tr>;

// const Statistics = ({ total, goodCount, neutralCount, badCount, running }) => {
//   if (total === 0) {
//     return 'No feedback given';
//   }
//   return (
//     <table>
//       <tbody>
//         <StatLine text='good' stat={goodCount} />
//         <StatLine text='neutral' stat={neutralCount} />
//         <StatLine text='bad' stat={badCount} />
//         <StatLine text='all' stat={total} />
//         <StatLine text='average' stat={running / total} />
//         <StatLine text='positive' stat={(goodCount / total) * 100} />
//       </tbody>
//     </table>
//   );
// }

// const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

// const App = () => {
//   const [goodCount, setGoodCount] = useState(0);
//   const [neutralCount, setNeutralCount] = useState(0);
//   const [badCount, setBadCount] = useState(0);
//   const [running, setRunning] = useState(0);
//   const [total, setTotal] = useState(0);

//   const handleGoodClick = () => {
//     const updatedGood = goodCount + 1;
//     setGoodCount(updatedGood);
//     setRunning(running + 1);
//     setTotal(updatedGood + neutralCount + badCount);
//   }

//   const handleNeutralClick = () => {
//     const updatedNeutral = neutralCount + 1;
//     setNeutralCount(updatedNeutral);
//     setTotal(goodCount + updatedNeutral + badCount);
//   }

//   const handleBadClick = () => {
//     const updatedBad = badCount + 1;
//     setBadCount(updatedBad);
//     setRunning(running - 1);
//     setTotal(goodCount + neutralCount + updatedBad);
//   }

//   return (
//     <div>
//       <Title text="give feedback" />
//       <Button handleClick={handleGoodClick} text="good" />
//       <Button handleClick={handleNeutralClick} text="neutral" />
//       <Button handleClick={handleBadClick} text="bad" />
//       <Title text="statistics" />
//       <Statistics total={total} goodCount={goodCount} neutralCount={neutralCount} badCount={badCount} running={running} />
//     </div>
//   )
// }