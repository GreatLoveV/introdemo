import {useState}  from "react";

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props)=>{
  if (props.totalClicks === 0)
    { 
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    } 

  return (
    <div>
      <StatisticLine text = {'good'} value={props.good}/>
      <StatisticLine text = {'neutral'} value={props.neutral}/>
      <StatisticLine text = {'bad'} value={props.bad}/>
      <StatisticLine text = {'all'} value={props.totalClicks}/>
      <StatisticLine text = {'average'} value={props.average}/>
      <StatisticLine text = {'positive'} value={props.positiveFeedback + '%'}/>

    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)

  const handleGoodCLick = () =>{
    console.log("Good was clicked!")
    setGood(good + 1)
    setTotalClicks(totalClicks +1)
  }
  const handleNeutralCLick = () =>{
    console.log("Neutral was clicked!")
    setNeutral(neutral + 1)
    setTotalClicks(totalClicks +1)
  }
  const handleBadCLick = () =>{
    console.log("Bad was clicked!")
    setBad(bad + 1)
    setTotalClicks(totalClicks +1)
    
  }
  const average = totalClicks === 0
    ? 0 
    : (good * 1 + neutral *0 + bad * -1)/ totalClicks;
  const positiveFeedback = totalClicks === 0
    ? "0%"
    : (good /totalClicks)*100
  return(
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodCLick} text={"good"}/>
      <Button onClick={handleNeutralCLick} text={"neutral"}/>
      <Button onClick={handleBadCLick} text={"bad"}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} totalClicks={totalClicks} average={average} positiveFeedback = {positiveFeedback} /> 

      
    </div>
  )
}

export default App