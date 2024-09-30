import Course from "./components/Course.jsx";

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