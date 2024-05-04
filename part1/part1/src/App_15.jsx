/* App file for exercises of part 1 up to ex 1.5 */

const Header = (props) => {  
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
};

const SingleContent = (props) => {
  return (
    <>
    <p>{props.name} {props.value}</p>
    </>
  );
};

const Result = (props) => {
  return (
    <>
    <p>Number of exercises {props.value}</p>
    </>
  );
};

const Content = (props) => {
  let sum = 0;

  //Notes to myself: 
  // - a list to be embedded needs a unique key value for the React framework to handle list 
  //   elements efficiently and track changes.
  // - a list's map function iterates over the list's elements and puts the return value of the 
  //   mapping function in an output list

  let output = props.data.map(d => {
    sum += d.exercises; 
    return <SingleContent name={d.name} value={d.exercises} key={d.id}/>;
  });

  return (
    <>
    {output}
    <Result value={sum} />
    </>
  );
};

const App = () => {
  const course ={
    title: 'Half Stack application development',
    data : [
      {
        id: 0,
        name: 'Fundamentals of React',
        exercises: 10
      },{
        id: 1,
        name: 'Using props to pass data',
        exercises: 7
      },{
        id: 2,
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header title={course.title}/>
      <Content data={course.data}/>
    </div>
  );
};

export default App;