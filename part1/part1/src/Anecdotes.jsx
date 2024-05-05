import { useState } from 'react'

const Header = ({title}) => {  
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
}

const QuoteBlock = ({title, quote, votes}) => {
  return (
    <>
      <Header title={title} />
      <p>{quote}</p>
      <p>has {votes} votes</p>
    </>
  );
}

const randomIndex = (size) => Math.floor(Math.random() * size);

//generates a range from {0, ... , size-1}
const range = (size) => [...Array(size).keys()];

//generates a array of given size initialized with zeros
const zeros = (size) => Array(size).fill(0);

//gives index of max value, in case of multiple returns first occurrence
const argmax = (arr) => arr.indexOf(Math.max(...arr));

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  let selectedState = {
    votes: zeros(anecdotes.length),
    idx: 0
  }
 
  const [selected, setSelected] = useState(selectedState)
  
  const handleNewQuote = () => {
    let rIdx = randomIndex(anecdotes.length);
    
    let newSelected = {...selected, idx: rIdx};
    
    setSelected(newSelected);
  }

  const handleVote = () => {
    let newSelected = {...selected}; //copy state

    newSelected.votes[newSelected.idx]++;

    setSelected(newSelected);
  }

  return (
    <div>
      <QuoteBlock title="Vote your favorite anecdote" quote={anecdotes[selected.idx]} votes={selected.votes[selected.idx]} />
      <Button handleClick={handleNewQuote} text={"New Quote"} />
      <Button handleClick={handleVote} text={"Vote"} />
      <QuoteBlock title="Most voted:" quote={anecdotes[argmax(selected.votes)]} votes={selected.votes[argmax(selected.votes)]} />
    </div>
  )
}

export default App