const argv = require("yargs").argv;
const colors = require("colors");

if (argv.text === null || Number.isInteger(argv.text)) {
  console.log("Nie podano tekstu.");
  process.exit(0);
} else
  function colorTheSentence() {
    colors.enable();
    return console.log(argv.text.rainbow);
  }

colorTheSentence();

// node 02.js --text="Cannot read properties of undefined"
