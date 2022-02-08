const CORRECT = "🟩";
const WRONG_SPOT = "🟨";
const WRONG_SPOT_TEXT_SUFFIX = "an falscher Stelle";
const CORRECT_TEXT_SUFFIX = "korrekt";
const WIN_TEXT = "GG!";
const ALL_WRONG_TEXT = "ZONK!";
const ALL_IN_WRONG_SPOT_TEXT = "Alles an falscher Stelle";
export const INVALID_INPUT_ERROR_MESSAGE =
  "Ungültige Eingabe. Die Eingabe muss aus 1-5 Zeilen bestehen die jeweils genau 5 Zeichen aus der folgenden Liste enthalten: 🟨, ⬜, 🟩";
const EMPTY_INPUT_ERROR_MESSAGE =
  "Die Eingabe ist ungültig. Sie muss einen nicht-leeren Text enthalten";

const INPUT_VALIDATION_PATTERN =
  /^[🟩🟨⬜]{5}\n(?:[🟩🟨⬜]{5}\n)?(?:[🟩🟨⬜]{5}\n)?(?:[🟩🟨⬜]{5}\n)?(?:[🟩🟨⬜]{5}\n?)?$/u;

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
    throw new Error(EMPTY_INPUT_ERROR_MESSAGE);
  }

  if (!INPUT_VALIDATION_PATTERN.test(input)) {
    throw new Error(INVALID_INPUT_ERROR_MESSAGE);
  }

  const trimmedInput = input.trim();

  const lines = trimmedInput.split("\n");

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
      const allInWrongSpot = wrongSpotNumbers.length === 5;

      // early return with "GG" and don't consider any following lines anymore
      if (allCorrect) {
        alreadySolved = true;
        return `${LINE_TEXT_PREFIX} ${WIN_TEXT}`;
      }

      // early return when the whole line does not anything correct
      if (allWrong) return `${LINE_TEXT_PREFIX} ${ALL_WRONG_TEXT}`;

      // early return when the whole line has everything in the wrong spot
      if (allInWrongSpot)
        return `${LINE_TEXT_PREFIX} ${ALL_IN_WRONG_SPOT_TEXT}`;

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
