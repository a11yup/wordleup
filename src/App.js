import { createRef, useState } from "react";
import "./App.css";
import transform from "./transform.js";

function App() {
  const textAreaElement = createRef();

  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    let transformedResult;
    try {
      transformedResult = transform(event.target.value);
      setResult(transformedResult);
      setErrorMessage("");
    } catch (error) {
      setResult("");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>WORDLE UP!</h1>
        <p className="subtext">
          Ein Konverter für Wordle Emoji Matrix in reinen Text (für mehr
          Accessibility in Wordle Tweets)
        </p>
      </header>
      <main>
        <div className="input-output-area">
          <div className="input-area">
            <h2>Eingabe</h2>
            <label htmlFor="input" className="label">
              Worlde Emoji Matrix:
            </label>
            <textarea
              id="input"
              className="emoji-matrix-input"
              ref={textAreaElement}
              onChange={handleInputChange}
            ></textarea>
            <p className="error-message">{errorMessage}</p>
          </div>
          <div className="output-area">
            <h2>Resultat</h2>
            <code className="result">{result}</code>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
