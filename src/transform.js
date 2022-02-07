const CORRECT = "🟩";
const WRONG_SPOT = "🟨";
const WRONG_SPOT_TEXT_SUFFIX = "an falscher Stelle";
const CORRECT_TEXT_SUFFIX = "korrekt";

// Nice-to-haves
// 1. letztes komma durch ein und ersetzen
// 2. wenn alle am falschen spot: "alle an falscher Stelle"

const transform = (input) => {
  if (input === undefined || typeof input !== "string" || input.length === 0) {
    throw new Error("Invalid input");
  }

  const sanitizedInput = input.trim();

  // TODO input validation: is input defined and is input well-formed
  const lines = sanitizedInput.split("\n");

  let result = "";

  lines.forEach((line, index) => {
    const wrongSpotNumbers = [];
    const correctSpotNumbers = [];

    for (let [index, character] of Array.from(line).entries()) {
      switch (character) {
        case WRONG_SPOT:
          wrongSpotNumbers.push(index + 1);
          break;
        case CORRECT:
          correctSpotNumbers.push(index + 1);
          break;
        default:
          break;
      }
    }

    const correctText = correctSpotNumbers
      .map((number) => `${number}.`)
      .join(" und ");

    const wrongSpotText = wrongSpotNumbers
      .map((number) => `${number}.`)
      .join(" und ");

    if (correctSpotNumbers.length === 5) {
      result += `Zeile ${index + 1}: GG!\n`;
    } else if (
      correctSpotNumbers.length === 0 &&
      wrongSpotNumbers.length === 0
    ) {
      result += `Zeile ${index + 1}: ZONK!\n`;
    } else if (wrongSpotNumbers.length > 0 && correctSpotNumbers.length === 0) {
      result += `Zeile ${
        index + 1
      }: ${wrongSpotText} ${WRONG_SPOT_TEXT_SUFFIX}\n`;
    } else if (correctSpotNumbers.length > 0 && wrongSpotNumbers.length === 0) {
      result += `Zeile ${index + 1}: ${correctText} ${CORRECT_TEXT_SUFFIX}\n`;
    } else if (correctSpotNumbers.length > 0 && wrongSpotNumbers.length > 0) {
      result += `Zeile ${
        index + 1
      }: ${correctText} ${CORRECT_TEXT_SUFFIX}, ${wrongSpotText} ${WRONG_SPOT_TEXT_SUFFIX}\n`;
    }
  });

  return result;
};

export default transform;
