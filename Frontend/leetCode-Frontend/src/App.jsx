import { useState } from "react";

const problems1 = [{
  title: "201. Bitwise AND of Numbers Range",
  difficulty: "Medium",
  acceptance: "42%"
},
{
  title: "201. Bitwise AND of Numbers Range",
  difficulty: "Medium",
  acceptance: "412%"
},
{
    title: "202. Happy Number",
    difficulty: "Easy",
    acceptance: "54.9%"
},
{
    title: "203. Remove Linked List Elements",
    difficulty: "Hard",
    acceptance: "42%"
}];

const problems2=[{
  title: "Title1",
  difficulty: "Medium",
  acceptance: "42%"
},{
  title: "Titl2",
  difficulty: "Easy",
  acceptance: "82%"
},{
  title: "Title3",
  difficulty: "Hard",
  acceptance: "32%"
}];


function App() {

  const [problems, setProblems] = useState([]);

  return (
    <>
      <div>
        <input type="text" placeholder = "email"/>
        <input type="text" placeholder = "Password"/>
        <button className="signin">Sign in</button>

        <div>
          <button onClick={ ()=>{
            setProblems(problems=> problems1);
            }}>1</button>
          <button onClick={ ()=>{
            setProblems(problems=> problems2);
            }}>2</button>
        </div>

        <div>
          {problems.map(problem => <ProblemStatement 
            title = {problem.title}
            acceptance= {problem.acceptance}
            difficulty = {problem.difficulty}
          />) }
        </div>
      </div>
    </>
  )
}

function ProblemStatement(props){
    const title= props.title;
    const acceptance = props.acceptance;
    const difficulty = props.difficulty;

    return <tr>
      <td>{title}</td>
      <td>{acceptance} </td>
      <td style={{color: difficulty === "Hard"? "red": "green"}}>{difficulty} </td>
    </tr>
}

export default App
