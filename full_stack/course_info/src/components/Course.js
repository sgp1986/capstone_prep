const Header = ({ course }) => {
  return <h1>{course}</h1>;
}

const Part = ({ part, exercise }) => {
  return <p>{part} {exercise}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises);
  const total = exercises.reduce((a, b) => a + b, 0);
  return <p>Number of exercises {total}</p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course