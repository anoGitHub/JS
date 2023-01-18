const fs = require("fs");

let directory_name = process.argv[2];
if (process.argv.length < 3) {
  console.log("Za mało parametrów wejściowych!");
} else if (process.argv.length > 3) {
  console.log("Za duzo parametrów wejściowych!");
} else {
  let readedFile = fs.stat(directory_name, (error, stats) => {
    if (error) {
      console.log(`Nie udało się odczytać pliku ${directory_name}`);
    } else {
      console.log(stats);
    }
  });
}

// node 03.js 03.js
