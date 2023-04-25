import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (

    <>
      <h1>{props.course}</h1>
    </>
    
    
  )
    
  
  
}
const Content = (props) => {

  return(
    <p>
      {props.part} = {props.number}
    </p>
  )


}
const Total = (props) => {

  return(
    <h3>
      Number total of exercises = {props.total}
    </h3>
    
    )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content part={part1} number={exercises1}/>
      <Content part={part2} number={exercises2}/>
      <Content part={part3} number={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>

    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root')) 
