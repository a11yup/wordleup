import { createRef, useState } from "react";
import "./App.css";
import transform from "./transform.js";

function App() {
  const textAreaElement = createRef();
  const preserveOtherTextCheckboxElement = createRef();

  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const transformText = () => {
    let transformedResult;
    const shouldPreserveOtherText =
      preserveOtherTextCheckboxElement.current.checked;
    const textInput = textAreaElement.current.value;
    try {
      transformedResult = transform(textInput, shouldPreserveOtherText);
      setResult(transformedResult);
      setErrorMessage("");
    } catch (error) {
      setResult("");
      setErrorMessage(error.message);
    }
  };

  const handlePreserveOtherTextCheckboxClick = () => {
    if (textAreaElement.current.value) {
      transformText();
    }
  };

  const handleCopyClick = () => {
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
            <input
              type="checkbox"
              id="preserve-other-text"
              onChange={handlePreserveOtherTextCheckboxClick}
              defaultChecked={true}
              ref={preserveOtherTextCheckboxElement}
            />
            <label htmlFor="preserve-other-text" className="label">
              Weiteren Text beibehalten
            </label>
            <label htmlFor="text-input" className="label text-area-label">
              Worlde Emoji Matrix:
            </label>
            <textarea
              id="text-input"
              className="emoji-matrix-input"
              ref={textAreaElement}
              onChange={transformText}
              rows="11"
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
            {result && <p className="result">{result}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
