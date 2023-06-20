const fs = require("fs");

let directory_name = process.argv[1];
if (process.argv.length < 2) {
  console.log("Za mało parametrów wejściowych!");
} else if (process.argv.length > 2) {
  console.log("Za duzo parametrów wejściowych!");
} else {
  let readedFile = fs.stat(directory_name, (error, stats) => {
    if (error) {
      console.log(`Nie udało się odczytać pliku ${directory_name}`);
    } else {
      console.log(`Czas utworzenia pliku to: ${stats.birthtime}`);
      console.log(`Czas modyfikacji pliku to: ${stats.atime}`);
      console.log(`Rozmiar pliku to: ${stats.size}`);
    }
  });
}

// node 03.js
