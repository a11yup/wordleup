import transform from "./transform.js";

describe("when pure emoji matrix is input", () => {
  it("outputs the correct result when the first line is already a win and there is no newline at the end", () => {
    const input = `🟩🟩🟩🟩🟩`;
    const result = transform(input);

    const targetResult = `Zeile 1: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when the first line is already a win and there is a newline at the end", () => {
    const input = `🟩🟩🟩🟩🟩\n`;
    const result = transform(input);

    const targetResult = `Zeile 1: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when the first line is already a win and there are multiple newlines at the end", () => {
    const input = `🟩🟩🟩🟩🟩\n\n`;
    const result = transform(input);

    const targetResult = `Zeile 1: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when the first line is already a win and there are multiple newlines at the beginning and at the end", () => {
    const input = `\n\n🟩🟩🟩🟩🟩\n\n`;
    const result = transform(input);

    const targetResult = `Zeile 1: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when there is a full 6 rounds game and a newline at the end", () => {
    const input = `⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n`;
    const result = transform(input);

    const targetResult = `Zeile 1: 5. korrekt\nZeile 2: 5. korrekt\nZeile 3: 5. korrekt\nZeile 4: 5. korrekt\nZeile 5: 5. korrekt\nZeile 6: 5. korrekt`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when there is a full 6 rounds game and mutiple newlines at the end", () => {
    const input = `⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n\n\n\n`;
    const result = transform(input);

    const targetResult = `Zeile 1: 5. korrekt\nZeile 2: 5. korrekt\nZeile 3: 5. korrekt\nZeile 4: 5. korrekt\nZeile 5: 5. korrekt\nZeile 6: 5. korrekt`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when there is a less than 6 rounds game and mutiple newlines at the end", () => {
    const input = `⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n🟩🟩🟩🟩🟩\n\n\n\n`;
    const result = transform(input);

    const targetResult = `Zeile 1: 5. korrekt\nZeile 2: 5. korrekt\nZeile 3: 5. korrekt\nZeile 4: 5. korrekt\nZeile 5: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when there is a win in last round", () => {
    const input = `⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟨🟩🟩🟩\n🟩🟩🟩🟩🟩`;
    const result = transform(input);

    const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1., 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: 2., 3. und 4. korrekt, 5. an falscher Stelle\nZeile 5: 1., 3., 4. und 5. korrekt, 2. an falscher Stelle\nZeile 6: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when there is a win in the 4th round", () => {
    const input = `⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n🟩🟩🟩🟩🟩`;
    const result = transform(input);

    const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1., 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when everything is wrong for 5 rounds", () => {
    const input = `⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜`;
    const result = transform(input);

    const targetResult = `Zeile 1: ZONK!\nZeile 2: ZONK!\nZeile 3: ZONK!\nZeile 4: ZONK!\nZeile 5: ZONK!`;

    expect(result).toBe(targetResult);
  });

  it("treats black exactly the same as grey squares", () => {
    const input = `⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛`;
    const result = transform(input);

    const targetResult = `Zeile 1: ZONK!\nZeile 2: ZONK!\nZeile 3: ZONK!\nZeile 4: ZONK!\nZeile 5: ZONK!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when everything is in the wrong spot all the time", () => {
    const input = `🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
    const result = transform(input);

    const targetResult = `Zeile 1: Alles an falscher Stelle\nZeile 2: Alles an falscher Stelle\nZeile 3: Alles an falscher Stelle\nZeile 4: Alles an falscher Stelle\nZeile 5: Alles an falscher Stelle`;

    expect(result).toBe(targetResult);
  });

  it("throws an error when a matrix line has more than 5 characters", () => {
    const input = `🟨🟨🟨🟨🟨🟩\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
    expect(() => transform(input)).toThrow();
  });

  it("throws an error when there are more than 6 but otherwise correct lines", () => {
    const input = `🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
    expect(() => transform(input)).toThrow();
  });

  it("throws an error when there is any character othen than the 3 allowed ones inside the matrix", () => {
    const input = `🟨🟨x🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨\n🟨🟨🟨🟨🟨`;
    expect(() => transform(input)).toThrow();
  });
});

describe("when there is more input than just the emoji matrix", () => {
  it("does not throw if there is surrounding text (without newline separation) to an otherwise valid emoji matrix", () => {
    const input = `Wordle 235 X/6⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟨🟩🟩🟩\n🟩🟩🟩🟩🟩wordle.at/play`;

    expect(() => transform(input)).not.toThrow();
  });

  it("does not throw if there is surrounding text (with newline separation) to an otherwise valid emoji matrix", () => {
    const input = `Wordle 235 X/6\n\n⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟨🟩🟩🟩\n🟩🟩🟩🟩🟩\n\nwordle.at/play`;

    expect(() => transform(input)).not.toThrow();
  });

  it("outputs the correct result even if there is some text before the matrix", () => {
    const input = `Wordle 235 X/6\n\n⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟨🟩🟩🟩\n🟩🟩🟩🟩🟩`;
    const result = transform(input);

    const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1., 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: 2., 3. und 4. korrekt, 5. an falscher Stelle\nZeile 5: 1., 3., 4. und 5. korrekt, 2. an falscher Stelle\nZeile 6: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result even if there is some text after the matrix", () => {
    const input = `⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟨🟩🟩🟩\n🟩🟩🟩🟩🟩\n\nwordle.at/play`;
    const result = transform(input);

    const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1., 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: 2., 3. und 4. korrekt, 5. an falscher Stelle\nZeile 5: 1., 3., 4. und 5. korrekt, 2. an falscher Stelle\nZeile 6: GG!`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result even if there is some text before and after the matrix", () => {
    const input = `Wordle 235 X/6\n\n⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟨🟩🟩🟩\n🟩🟩🟩🟩🟩\n\nwordle.at/play`;
    const result = transform(input);

    const targetResult = `Zeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1., 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: 2., 3. und 4. korrekt, 5. an falscher Stelle\nZeile 5: 1., 3., 4. und 5. korrekt, 2. an falscher Stelle\nZeile 6: GG!`;

    expect(result).toBe(targetResult);
  });
});

describe("when just any random text is entered", () => {
  it("throws an error", () => {
    const input = `Wordle 235 X/6\n\nwordle.at/play`;
    expect(() => transform(input)).toThrow();
  });
});

describe("when preserving surrounding text is activated", () => {
  it("preserves the pre-text and post-text around the result output", () => {
    const input = `Wordle 235 X/6\n\n⬜⬜🟨⬜🟨\n🟨⬜🟨🟨⬜\n⬜⬜🟩🟩🟨\n⬜🟩🟩🟩🟨\n🟩🟨🟩🟩🟩\n🟩🟩🟩🟩🟩\n\nwordle.at/play`;
    const result = transform(input, true);

    const targetResult = `Wordle 235 X/6\n\nZeile 1: 3. und 5. an falscher Stelle\nZeile 2: 1., 3. und 4. an falscher Stelle\nZeile 3: 3. und 4. korrekt, 5. an falscher Stelle\nZeile 4: 2., 3. und 4. korrekt, 5. an falscher Stelle\nZeile 5: 1., 3., 4. und 5. korrekt, 2. an falscher Stelle\nZeile 6: GG!\n\nwordle.at/play`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when there is a full 6 rounds game and a newline at the end", () => {
    const input = `Wordle 235 X/6\n\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n`;
    const result = transform(input, true);

    const targetResult = `Wordle 235 X/6\n\nZeile 1: 5. korrekt\nZeile 2: 5. korrekt\nZeile 3: 5. korrekt\nZeile 4: 5. korrekt\nZeile 5: 5. korrekt\nZeile 6: 5. korrekt\n`;

    expect(result).toBe(targetResult);
  });

  it("outputs the correct result when there is a full 6 rounds game and mutiple newlines at the end", () => {
    const input = `Wordle 235 X/6\n\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n⬜⬜⬜⬜🟩\n\n\n\n`;
    const result = transform(input, true);

    const targetResult = `Wordle 235 X/6\n\nZeile 1: 5. korrekt\nZeile 2: 5. korrekt\nZeile 3: 5. korrekt\nZeile 4: 5. korrekt\nZeile 5: 5. korrekt\nZeile 6: 5. korrekt\n\n\n\n`;

    expect(result).toBe(targetResult);
  });
});
