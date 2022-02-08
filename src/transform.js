const CORRECT = "🟩";
const WRONG_SPOT = "🟨";
const WRONG_SPOT_TEXT_SUFFIX = "an falscher Stelle";
const CORRECT_TEXT_SUFFIX = "korrekt";

// Nice-to-haves
// 1. letztes komma durch ein und ersetzen ✅
// 2. wenn alle am falschen spot: "alle an falscher Stelle"

const createEnumerationString = (numbers) =>
  numbers.reduce((previous, current, index) => {
    if (index === 0) {
      return `${current}.`;
    } else if (numbers.length - 1) {
      return `${previous} und ${current}.`;
    } else {
      return `${previous}, ${current}.`;
    }
  }, "");

const transform = (input) => {
  if (input === undefined || typeof input !== "string" || input.length === 0) {
    throw new Error("Invalid input");
  }

  const sanitizedInput = input.trim();

  // TODO input validation: is input defined and is input well-formed
  const lines = sanitizedInput.split("\n");

  // let result = "";

  let alreadySolved = false;

  const result = lines
    .map((line, index) => {
      // return early
      if (alreadySolved) return "";

      const wrongSpotNumbers = [];
      const correctNumbers = [];
      const LINE_TEXT_PREFIX = `Zeile ${index + 1}:`;

      [...line].forEach((character, index) => {
        if (character === WRONG_SPOT) wrongSpotNumbers.push(index + 1);
        if (character === CORRECT) correctNumbers.push(index + 1);
      });

      const allCorrect = correctNumbers.length === 5;
      const allWrong = correctNumbers.length + wrongSpotNumbers.length === 0;

      // early return with "GG" and don't consider any following lines anymore
      if (allCorrect) {
        alreadySolved = true;
        return `${LINE_TEXT_PREFIX} GG!`;
      }

      // early return when the whole line does not anything correct
      if (allWrong) return `${LINE_TEXT_PREFIX} ZONK!`;

      // in all other cases: create properly enumerates text strings for the two relevant cases:
      // correct and in wrong spot

      let correctNumbersText = createEnumerationString(correctNumbers);
      // only add suffix when the text is not empty
      correctNumbersText &&= `${correctNumbersText} ${CORRECT_TEXT_SUFFIX}`;

      let wrongSpotNumbersText = createEnumerationString(wrongSpotNumbers);
      // only add suffix when the text is not empty
      wrongSpotNumbersText &&= `${wrongSpotNumbersText} ${WRONG_SPOT_TEXT_SUFFIX}`;

      // relying on empty strings being falsy and thus being filtered out with `filter(Boolean)`
      // and `join` only taking effect if there are at least two items in the array.
      // this effectively only concatenates both strings if both are non-empty
      const mixedResultsText = [correctNumbersText, wrongSpotNumbersText]
        .filter(Boolean)
        .join(", ");

      return `${LINE_TEXT_PREFIX} ${mixedResultsText}`;
    })
    .filter(Boolean)
    .join("\n");

  return result;
};

export default transform;
