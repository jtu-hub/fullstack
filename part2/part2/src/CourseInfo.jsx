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
      <Header title={courseData.name}/>
      <Content data={courseData.parts}/>
    </>
  )
};

const App = () => {
  const courses =[{
    id: 1,
    name: 'Half Stack application development',
    parts : [
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
  },{
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }];

  return (
    <div>
      {courses.map(course => <Course courseData={course} key={course.id} />)}
    </div>
  );
};

export default App;