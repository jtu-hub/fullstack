import { useReducer } from "react";

const Header = ({title}) => {  
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Part = ({name, value}) => {
  return (
    <>
    <p>{name} {value}</p>
    </>
  );
};

const Sum = ({value}) => {
  return (
    <>
    <p><strong>Number of exercises {value}</strong></p>
    </>
  );
};

const Content = ({data}) => {
  //not sure this is the most elegant reduce implementation
  let initialInput = {sum: 0, output: []}
  var {sum, output} = data.reduce(
    (res, d) => {
      res.sum = res.sum + d.exercises;
      res.output = [...res.output, <Part name={d.name} value={d.exercises} key={d.id}/>];

      return res;
    },
    initialInput
  )

  return (
    <>
    {output}
    <Sum value={sum} />
    </>
  );
};

const Course = ({courseData}) => {
  return (
    <>
      <Header title={courseData.title}/>
      <Content data={courseData.data}/>
    </>
  )
};

const App = () => {
  const course ={
    id: 1,
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
      },{
        id: 3,
        name: 'Skibidi',
        exercises: 11
      },{
        id: 4,
        name: 'pa-pa',
        exercises: 4
      }
    ]
  };

  return (
    <div>
      <Course courseData={course} />
    </div>
  );
};

export default App;