import transform from "./transform.js";

it("outputs the correct result when the first line is already a win", () => {
  const input = `🟩🟩🟩🟩🟩\n`;
  const result = transform(input);

  const targetResult = `Zeile 1: GG!`;

  expect(result).toBe(targetResult);
});

it("outputs the correct result when there is a win in last round", () => {
  const input = `⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟩🟩🟩🟩`;
  const result = transform(input);

  const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1. und 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: 2. und 3. und 4. korrekt, 5. an falscher Stelle\nZeile 5: GG!`;

  expect(result).toBe(targetResult);
});

it("outputs the correct result when there is a win in the 4th round", () => {
  const input = `⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n🟩🟩🟩🟩🟩`;
  const result = transform(input);

  const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1. und 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: GG!`;

  expect(result).toBe(targetResult);
});

it("outputs the correct result when everything is wrong for 5 rounds", () => {
  const input = `⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜`;
  const result = transform(input);

  const targetResult = `Zeile 1: ZONK!\nZeile 2: ZONK!\nZeile 3: ZONK!\nZeile 4: ZONK!\nZeile 5: ZONK!`;

  expect(result).toBe(targetResult);
});

it("outpus the correct result when everything is in the wrong spot all the time", () => {
  const input = `🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
  const result = transform(input);

  const targetResult = `Zeile 1: Alles an falscher Stelle\nZeile 2: Alles an falscher Stelle\nZeile 3: Alles an falscher Stelle\nZeile 4: Alles an falscher Stelle\nZeile 5: Alles an falscher Stelle`;

  expect(result).toBe(targetResult);
});

it("throws an error when a line has more than 5 characters", () => {
  const input = `🟨🟨🟨🟨🟨🟩\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
  expect(() => transform(input)).toThrow();
});

it("throws an error when there are more than 5 but otherweise correctlines", () => {
  const input = `🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
  expect(() => transform(input)).toThrow();
});

it("throws an error when there is any character othen than the 3 allowed ones", () => {
  const input = `🟨🟨x🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
  expect(() => transform(input)).toThrow();
});
