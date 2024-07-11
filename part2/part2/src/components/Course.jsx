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

  export default Course;