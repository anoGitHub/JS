const fs = require("fs");

let fileName = "todos.json";

const createTodo = (title, todo) => {
  try {
    fs.access(fileName, (err) => {
      if (err) {
        console.log("Creating new file");
        fs.writeFileSync(fileName, JSON.stringify([]));
      }
      const todoBuffer = fs.readFileSync(fileName);
      let dataJSON = todoBuffer.toString();
      const todos = JSON.parse(dataJSON);

      const duplicateTodo = todos.find((todo) => {
        return todo.title === title;
      });

      if (!duplicateTodo) {
        todos.push({
          title: title,
          todo: todo,
        });
        dataJSON = JSON.stringify(todos);
        fs.writeFileSync(fileName, dataJSON);
      } else {
        console.log("New Todo title has already been used");
      }
    });
  } catch (error) {
    console.log("An error during creation occured");
  }
};

const listTodo = () => {
  try {
    const todoBuffer = fs.readFileSync(fileName);
    let dataJSON = todoBuffer.toString();
    const todos = JSON.parse(dataJSON);
    console.log(todos);
  } catch (error) {
    console.log("An error during listing occured");
  }
};

const deleteTodo = (title) => {
  try {
    const todos = listTodo();
    const filteredToDos = todos.filter((todo) => todo.title !== title);

    dataJSON = JSON.stringify(filteredToDos);
    fs.writeFileSync(fileName, dataJSON);
  } catch (error) {
    console.log("An error during delete occured");
  }
};

module.exports = {
  createTodo,
  listTodo,
  deleteTodo,
};
