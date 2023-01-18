// [2 punkty] Napisz aplikację która przyjmuje w parametrze uruchamiania ciąg znaków a następnie wyświetli go w kolorach tęczy.
// Wykorzystaj moduł colors (https://www.npmjs.com/package/colors) w wersji 1.3.2!. Pamiętaj o obsłudze błędów.
// Sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

const yargs = require("yargs");
const colors = require("colors");
const argv = yargs.argv;

if (argv.text != null) {
  function colorTheSentence() {
    colors.enable();
    return console.log(argv.text.rainbow);
  }
} else console.log("Nie podano tekstu.");

colorTheSentence();
