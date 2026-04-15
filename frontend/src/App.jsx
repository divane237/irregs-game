import { useEffect, useState } from "react";
import CartonBox from "./components/CartonBox";
import Test from "./components/Test";

function App() {
  const [code, setCode] = useState(null);
  const [cities, setCities] = useState([]);
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("");
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const fetchCode = async () => {
    const res = await fetch("http://127.0.0.1:8000/random-code");
    const data = await res.json();
    setCode(data.code);
    setResult("");
    setResultType("");
  };

  const fetchCities = async () => {
    const res = await fetch("http://127.0.0.1:8000/cities");
    const data = await res.json();
    setCities(data.cities);
  };

  useEffect(() => {
    fetchCities();
    fetchCode();
  }, []);

  const sendAnswer = async (answer) => {
    setDisabled(true);
    const res = await fetch(
      `http://127.0.0.1:8000/check?code=${code}&answer=${answer}`,
      { method: "POST" }
    );
    const data = await res.json();

    if (data.correct) {
      setScore(s => s + 1);
      setResult("Correct!");
      setResultType("correct");
    } else {
      setResult(`Wrong — correct answer: ${data.expected}`);
      setResultType("wrong");
    }

    setTimeout(() => {
      setVisible(false);
      setTimeout(async () => {
        await fetchCode();
        setVisible(true);
        setDisabled(false);
      }, 200);
    }, 1000);
  };

  return (
    <>
  
    
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md text-center shadow-sm">

        <p className="text-xs font-mono font-bold tracking-widest uppercase text-gray-400 mb-6">
          UPS Code Game
        </p>

        <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1 text-sm text-gray-500 mb-6">
          Score <span className="font-mono font-bold text-gray-800">{score}</span>
        </div>

        
        <CartonBox code={code} visible={visible} />
       

        <div className="grid grid-cols-2 gap-3 mb-4">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => sendAnswer(city)}
              disabled={disabled}
              className="border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {city}
            </button>
          ))}
        </div>

        <p className={`text-sm min-h-5 font-medium transition-opacity ${
          resultType === "correct" ? "text-green-700" :
          resultType === "wrong" ? "text-red-700" : "text-transparent"
        }`}>
          {result || "."}
        </p>

      </div>
    </div>
    </>
  );
}

export default App;