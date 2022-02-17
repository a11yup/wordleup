# Wordle Emoji Text Converter

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

## What is this?

This small little project converts Wordle Emoji Share Texts like the example below into a pure text form in German language. This could be more accessible than posting grids of several emojis that would just spam screen reader users.

Text like...

```
Wordle 234 6/6

🟨🟨⬛⬛🟩
⬛⬛🟩🟨🟩
⬛🟩🟩⬛🟩
⬛🟩🟩⬛🟩
⬛🟩🟩⬛🟩
🟩🟩🟩🟩🟩
```

would be turned into:

```
Wordle 234 6/6

Zeile 1: 5. korrekt, 1. und 2. an falscher Stelle
Zeile 2: 3. und 5. korrekt, 4. an falscher Stelle
Zeile 3: 2., 3. und 5. korrekt
Zeile 4: 2., 3. und 5. korrekt
Zeile 5: 2., 3. und 5. korrekt
Zeile 6: Geschafft!
```


## How to get it to run locally

**Prequisite**: You have to have node.js installed on your machine.

1. Checkout the git repository
2. run `npm install`
3. run `npm start`

The running dev server will spawn a browser and load the app directly.
