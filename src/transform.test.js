import transform, { INVALID_INPUT_ERROR_MESSAGE } from "./transform.js";

it("win in first round", () => {
  const input = `🟩🟩🟩🟩🟩\n`;
  const result = transform(input);

  const targetResult = `Zeile 1: GG!`;

  expect(result).toBe(targetResult);
});

it("win in last round", () => {
  const input = `⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟩🟩🟩🟩`;
  const result = transform(input);

  const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1. und 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: 2. und 3. und 4. korrekt, 5. an falscher Stelle\nZeile 5: GG!`;

  expect(result).toBe(targetResult);
});

it("win in 4th round", () => {
  const input = `⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n🟩🟩🟩🟩🟩`;
  const result = transform(input);

  const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1. und 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: GG!`;

  expect(result).toBe(targetResult);
});

it("lose completely", () => {
  const input = `⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜`;
  const result = transform(input);

  const targetResult = `Zeile 1: ZONK!\nZeile 2: ZONK!\nZeile 3: ZONK!\nZeile 4: ZONK!\nZeile 5: ZONK!`;

  expect(result).toBe(targetResult);
});

it("everything in its wrong place all the time", () => {
  const input = `🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
  const result = transform(input);

  const targetResult = `Zeile 1: Alles an falscher Stelle\nZeile 2: Alles an falscher Stelle\nZeile 3: Alles an falscher Stelle\nZeile 4: Alles an falscher Stelle\nZeile 5: Alles an falscher Stelle`;

  expect(result).toBe(targetResult);
});

it("throws an error when a line has more than 5 characters", () => {
  const input = `🟨🟨🟨🟨🟨🟨d\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
  expect(() => transform(input)).toThrow();
});
