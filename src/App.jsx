const Hello = (props) =>{
  console.log(props)
  return (
    <>
    <p>Hello {props.name}, you're {props.age}?</p>
    </>
  )
}

const App = () => {
  const friends = [ 'Peter', 'Maya']

  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App