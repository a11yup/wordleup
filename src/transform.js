const CORRECT = "🟩";
const WRONG_SPOT = "🟨";
const WRONG_SPOT_TEXT_SUFFIX = "an falscher Stelle";
const CORRECT_TEXT_SUFFIX = "korrekt";
const WIN_TEXT = "Geschafft!";
const ALL_WRONG_TEXT = "Alles falsch!";
const ALL_IN_WRONG_SPOT_TEXT = "Alles an falscher Stelle";
export const INVALID_INPUT_ERROR_MESSAGE =
  "Fehler. Deine Eingabe muss eine Emoji-Zeichenkette enthalten, die aus 1-5 Zeilen besteht, und bei der jede Zeile jeweils genau 5 Zeichen aus der folgenden Liste enthält: 🟨, ⬜ bzw. ⬛, 🟩";
const EMPTY_INPUT_ERROR_MESSAGE =
  "Ungültige Eingabe. Es wurde nichts eingegeben.";

const INPUT_VALIDATION_PATTERN =
  /^(?<preText>[^🟩🟨⬜⬛]*)(?<emojiMatrix>(?:[🟩🟨⬜⬛]{5}\n?){1,6})(?<postText>[^🟩🟨⬜⬛]*)$/u;

const createEnumerationString = (numbers) =>
  numbers.reduce((previous, current, index) => {
    if (index === 0) {
      return `${current}.`;
    } else if (index === numbers.length - 1) {
      return `${previous} und ${current}.`;
    } else {
      return `${previous}, ${current}.`;
    }
  }, "");

const transform = (input, preserveSurroundingText) => {
  if (input === undefined || typeof input !== "string" || input.length === 0) {
    throw new Error(EMPTY_INPUT_ERROR_MESSAGE);
  }

  const match = input.match(INPUT_VALIDATION_PATTERN);

  if (!match) {
    throw new Error(INVALID_INPUT_ERROR_MESSAGE);
  }

  let emojiMatrix = match.groups.emojiMatrix;

  let hasTrailingLineEnd = false;

  if (!preserveSurroundingText) {
    emojiMatrix = emojiMatrix.trim();
  } else {
    // When surrounding text should be preserved we need to preserve all newlines as well.
    // The regex above unfortunately treats the directly following single newline character after the emoji matrix
    // as if it belongs to the emoji matrix match group. For splitting purposes we can't have a trailing newline to the
    // emoji matrix. Thus as a workaround we remove an existing single trailing newline character from the emoji matrix
    // and add it back at the very end for the intended and complete preservation of surrounding text.
    hasTrailingLineEnd = emojiMatrix.endsWith("\n");

    if (hasTrailingLineEnd) {
      emojiMatrix = emojiMatrix.slice(0, -1);
    }
  }

  const lines = emojiMatrix.split("\n");

  let alreadySolved = false;

  const emojiMatrixAsText = lines
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

  if (!preserveSurroundingText) {
    return emojiMatrixAsText;
  } else {
    // See comment above where `hasTrailingLineEnd` is assigned
    return (
      match.groups.preText +
      `${emojiMatrixAsText}${hasTrailingLineEnd ? "\n" : ""}` +
      match.groups.postText
    );
  }
};

export default transform;
