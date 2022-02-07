import { createRef, useState } from "react";
import "./App.css";
import transform from "./transform.js";

function App() {
  const textAreaElement = createRef();

  const [result, setResult] = useState("");

  const handleInput = () => {
    const transformedResult = transform(textAreaElement.current.value);
    setResult(transformedResult);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WORDLE UP!!!</h1>

        <h2>INPUT</h2>
        <label htmlFor="input">Worlde Emoji Matrix Input:</label>
        <textarea
          id="input"
          className="emoji-matrix-input"
          ref={textAreaElement}
        ></textarea>
        <button onClick={handleInput}>TRANSFORM!</button>

        <h2>OUTPUT</h2>
        <p className="result">{result}</p>
      </header>
    </div>
  );
}

export default App;
