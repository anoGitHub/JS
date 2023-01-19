const fs = require("fs");
const yargs = require("yargs");

const command = process.argv[2];

// if (command === "add") {
//   console.log("Dodaję notatkę");
// } else if (command === "remove") {
//   console.log("Usuwam notatke");
// }

yargs.command({
  command: "add",
  describe: "Enter description about command",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
    handler: addNotes(),
  },
});

function loadNotes() {
  try {
    const notesInJson = fs.readFileSync("notes.json");
    const notesToString = notesInJson.toString();
    return JSON.parse(notesInJson);
  } catch (error) {
    console.log("something  wron with the file");
  }
}
function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}

function addNotes(title) {
  try {
    // check if the json file exists
    fs.access("todos.json", (err) => {
      // if it does not exist, create a new json file
      if (err) {
        fs.writeFileSync("todos.json", JSON.stringify([]));
      }
      // read from the todo.json if it exists
      // const todoBuffer = fs.readFileSync("todos.json");
      // // convert it to string
      // let dataJSON = todoBuffer.toString();
      // // parse the data
      // const todos = JSON.parse(dataJSON);

      // // check if the todo title exists
      // const duplicateTodo = todos.find((todo) => {
      //   return todo.title === title;
      // });

      // if (!duplicateTodo) {
      //   todos.push({
      //     title: title,
      //   });
      // let dataJSON = JSON.stringify(title);
      // fs.writeFileSync("todos.json", dataJSON);
      fs.writeFile("todos.json", title.toString(), (error) => {
        if (error) {
          console.log("Zapis się nie udał");
        } else {
          console.log("Zapis się udał");
        }
      });
      console.log("New Todo Added");
      // } else {
      //   console.log("New Todo title has already been used");
      // }
    });
  } catch (error) {
    console.log("An error occured, try again");
  }
}
