/* App file for exercises of part 1, ex 1.6-11*/
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

const TableHeader = ({labels}) => {

  let headerLabels = labels.map(label => <th key={label}>{label}</th>);
    
  return (
    <tr>
      {headerLabels}
    </tr>
  );
}

const TableRow = ({rowEntries, rowLabel, columnLabels}) => {
  //if labels are not provided they will be undefined and thus result as false
  let areLabelsProvided = rowLabel && columnLabels && (rowEntries.length === columnLabels.length);

  let entries = rowEntries.map((entry, index) => <td key={areLabelsProvided ? [rowLabel, columnLabels[index]].join('-') : index}>{entry}</td>);
    
  return (
    <tr>
      {entries}
    </tr>
  );
}

//This component should not be used to render tables that change content dynamically as there is no proper key handling
const StaticTable = ({header, rows}) => {
  if(header) {
    var tableBody = [header, ...rows].map((row, index) => {
      if(index === 0)
        return <TableHeader labels={row} key="table-header" />
      else
        return <TableRow rowEntries={row} key={index} /> 
    });
  } else {
    var tableBody = rows.map((row, index) => {
        return <TableRow rowEntries={row} key={index} /> 
    });
  }

  return (
    <table>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  );
}

const Statistics = ({ratings}) => {
  if(ratings.sum()) {
    let rows = [
      ["good",     ratings.good                         ],
      ["neutral",  ratings.neutral                      ],
      ["bad",      ratings.bad                          ],
      ["total",    ratings.sum()                        ],
      ["score",    ratings.score().toFixed(2)           ],
      ["positive", ratings.positiveFeedback().toFixed(2)],
    ];

    return (
      <section className="ratings">
        <Header title="stats:" />
        <StaticTable rows={rows} />
      </section>
    )
  }

  return (
    <section className='ratings'>
      <p>Still waiting for feedback.. :S</p>
    </section>
  )
}

//Why are callbacks in the course defined inside the component? is it bad practice to define them 
//outside?
//Is it to favor black box development? If I understand it correctly, if I declare it insed the app 
//it is redefined every time the app component is rendered wherease in this way it is only defined 
//once, right? or does React optimize this in the background?
const buildHandleState = (state, setState, rating) => {
  return () => {
    let newState

    switch(rating) {
      case "bad":
        newState = {...state, bad: state.bad + 1};
      break;

      case "neutral":
        newState = {...state, neutral: state.neutral + 1};
      break;

      case "good":
      default:
        newState = {...state, good: state.good + 1};
      break;
    }

    setState(newState);
  }
}

const App = () => {
  const ratingsState = {
    good: 0,
    neutral: 0,
    bad: 0,
    
    sum() {
      return this.good + this.neutral + this.bad;
    },

    score() {
      let sum = this.sum()
      //if sum is 0 return 0
      return sum ? (this.good - this.bad) / sum : 0;
    },

    positiveFeedback() {
      let sum = this.sum()
      //if sum is 0 return 0
      return  sum ? this.good / sum * 100 : 0;
    }
  }

  // save clicks of each button to its own state
  const [ratings, setRatings] = useState(ratingsState);

  return (
    <div>
      <Header title="Rate your Unicafe <3" />
      <div className={"controls"}>
        <Button handleClick={buildHandleState(ratings, setRatings, "good")}    text={":)"}/>
        <Button handleClick={buildHandleState(ratings, setRatings, "neutral")} text={":|"}/>
        <Button handleClick={buildHandleState(ratings, setRatings, "bad")}     text={":("}/>
        <Statistics ratings={ratings} />
      </div>
    </div>
  )
}

export default App