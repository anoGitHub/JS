const fs = require("fs");
const argv = require("yargs").argv;

let todos = {
  todo: argv.todo,
};

const userData = JSON.stringify(todos);

fs.writeFileSync("todoapp.json", userData, (error) => {
  if (error) {
    console.log("błąd zapisu pliku");
  } else {
    console.log("plik został zapisany");
  }
});
