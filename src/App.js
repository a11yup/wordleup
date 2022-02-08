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

  const handleCopyClick = (event) => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="App">
      <header>
        <h1>WORDLE UP!</h1>
        <p className="subtext">
          Wandle eine Wordle Emoji Matrix in reine Textbeschreibung um (für mehr
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
            <p className="error-message" aria-live="assertive">
              {errorMessage}
            </p>
          </div>
          <div className="output-area">
            <h2>Resultat</h2>
            {result && (
              <button className="copy-button" onClick={handleCopyClick}>
                Kopieren
              </button>
            )}
            <code className="result">{result}</code>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
