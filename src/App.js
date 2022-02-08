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
      <header className="App-header">
        <h1>WORDLE UP!</h1>
        <p>
          Ein Konverter für Wordle Emoji Matrix in reinen Text (für mehr
          Accessibility in Wordle Tweets)
        </p>

        <h2>Eingabe</h2>
        <label htmlFor="input">Worlde Emoji Matrix:</label>
        <textarea
          id="input"
          className="emoji-matrix-input"
          ref={textAreaElement}
          onChange={handleInputChange}
        ></textarea>
        <p className="error-message">{errorMessage}</p>

        <h2>Resultat</h2>
        <p className="result">{result}</p>
      </header>
    </div>
  );
}

export default App;
