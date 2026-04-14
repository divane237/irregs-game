import { useEffect, useState } from "react";

function App() {

  const [code, setCode] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const fetchCode = async () => {
    const res = await fetch("http://127.0.0.1:8000/random-code");
    const data = await res.json();
    setCode(data.code);
    setResult("")
  }

  useEffect(() => {
    fetchCode();
  }, [])


  const sendAnswer = async (answer) => {
    console.log("BUTTON CLICKED", answer, code);
    const res = await fetch(
      `http://127.0.0.1:8000/check?code=${code}&answer=${answer}`,
      {method: "POST"}
    );

    const data = await res.json()
    if(data.correct) {
      setScore(score + 1 );
      setResult("Correct");
    } else {
      setResult(`Wrong (Correct: ${data.expected})`);
    }

    setTimeout(fetchCode, 1000);
  }

  

  return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
     <h1>UPS Code Game</h1>

      <h2>{code}</h2>

      <button onClick={() => sendAnswer("Berlin")}>Berlin</button>
      <button onClick={() => sendAnswer("Gera")}>Gera</button>
      <button onClick={() => sendAnswer("Nürnberg")}>Nürnberg</button>
      <button onClick={() => sendAnswer("N/A")}>N/A</button>

      <h3>{result}</h3>
      <h3>Score: {score}</h3>
    </div>
  );
}

export default App;
