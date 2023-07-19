import Courses from "./components/Courses"

const Header = ({ course }) => <h1 className="mb-5 text-6xl font-bold">{course}</h1>

const App = () => {



  const course = 'Half Stack application development'

  return (
    <div className="ml-2">
      <Header course={course} />
      <Courses />
    </div>
  )
}

export default App