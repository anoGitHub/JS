const fs = require("fs");
const yargs = require("yargs");
const utils = require("./utils");

const command = process.argv[2];

if (process.argv.length < 3) {
  console.log(
    "Possible invocation parameters are: add, remove, display. And then --title= and --todo= "
  );
} else {
  if (command == "add") {
    yargs.command({
      command: "add",
      describe: "Add a new todo",
      builder: {
        title: {
          describe: "Todo title",
          type: "string",
          demandOption: true,
        },
        todo: {
          describe: "Todo Body",
          type: "string",
          demandOption: true,
        },
      },
      handler: function (argv) {
        utils.createTodo(argv.title, argv.todo);
      },
    });
  } else if (command == "remove") {
    yargs.command({
      command: "remove",
      describe: "Remove todo with the title",
      builder: {
        title: {
          describe: "Todo title",
          type: "string",
          demandOption: true,
        },
      },
      handler: function (argv) {
        utils.deleteTodo(argv.title);
      },
    });
  } else if (command == "display") {
    yargs.command({
      command: "display",
      describe: "Get all Todos",
      handler: function () {
        utils.listTodo();
      },
    });
  } else {
    console.log(
      "Incorrect parameters. Possible invocation parameters are: add, remove, display. And then --title= and --todo= "
    );
  }
}

yargs.parse();

// node app.js display
// node app.js add --title="shopping" --todo="bread, cheese, bananas"
// node app.js remove --title="shopping" --todo="bread, cheese, bananas"
