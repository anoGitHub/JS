class CrateBoard {
  randomizationOfLivingCells(chance) {
    return Math.random() * 100 < chance ? 1 : 0;
  }

  initializeEmptyRow(numberOfElements) {
    let row = [];
    for (let i = 0; i < numberOfElements; i++) {
      row.push(0);
    }
    return row;
  }

  initializeEmptyBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
      board.push(this.initializeEmptyRow(numberOfColumns));
    }
    return board;
  }

  fillTheBoardWithLivingCells(numberOfRows, numberOfColumns, chancePercent) {
    let board = this.initializeEmptyBoard(numberOfRows, numberOfColumns);
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        board[y][x] = this.randomizationOfLivingCells(chancePercent);
      }
    }
    return board;
  }
}

class CellChecker {
  createMiniBoard(board, x, y) {
    let miniBoard = [[], [], []]; // mini-board as a 3x3 empty array

    // Check if the cell above and to the left exists within the board boundaries
    if (y - 1 > -1) {
      if (x - 1 > -1) {
        // up left
        miniBoard[0].push(board[y - 1][x - 1]);
      } else {
        miniBoard[0].push(0);
      }

      //up
      miniBoard[0].push(board[y - 1][x]);

      //up right
      if (x + 1 < board[0].length) {
        miniBoard[0].push(board[y - 1][x + 1]);
      } else {
        miniBoard[0].push(0);
      }

      //else
    } else {
      miniBoard[0].push(0); //up left
      miniBoard[0].push(0); //up
      miniBoard[0].push(0); //up right
    }

    if (x - 1 > -1) {
      miniBoard[1].push(board[y][x - 1]);
    } else {
      miniBoard[1].push(0);
    }

    if (x + 1 < board[1].length) {
      miniBoard[1].push(board[y][x + 1]);
    } else {
      miniBoard[1].push(0);
    }

    //down
    if (y + 1 < board.length) {
      if (x - 1 > -1) {
        //down left
        miniBoard[2].push(board[y + 1][x - 1]);
      } else {
        miniBoard[2].push(0);
      }
      //down
      miniBoard[2].push(board[y + 1][x]);

      //down right
      if (x + 1 < board[2].length) {
        miniBoard[2].push(board[y + 1][x + 1]);
      } else {
        miniBoard[2].push(0);
      }
    } else {
      miniBoard[2].push(0); //down left
      miniBoard[2].push(0); //down
      miniBoard[2].push(0); //down right
    }
    return miniBoard;
  }

  neighbourCount(miniBoard) {
    let livingCells = 0;
    for (let y = 0; y < miniBoard.length; y++) {
      for (let x = 0; x < miniBoard[y].length; x++) {
        if (miniBoard[y][x] === 1) {
          livingCells++;
        }
      }
    }
    return livingCells;
  }
  init(board, x, y) {
    return this.neighbourCount(this.createMiniBoard(board, x, y));
  }
}

class Draw {
  blank(id) {
    const xSize = 500;
    const ySize = 500;
    let canvas = document.getElementById(id);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, xSize, ySize);
  }

  grid(numberOfRows, numberOfColumns, id) {
    let canvas = document.getElementById(id);
    let ctx = canvas.getContext("2d");
    let size = 25;

    for (let x = 0; x < numberOfColumns; x++) {
      ctx.beginPath();
      ctx.moveTo(size * x, 0);
      ctx.lineTo(size * x, 500);
      ctx.stroke();
    } //vertical lines

    for (let y = 0; y < numberOfRows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, size * y);
      ctx.lineTo(500, size * y);
      ctx.stroke();
    } //horizontal lines
  }

  // grid(numberOfRows, numberOfColumns, containerId) {
  //     let gridHTML = '';

  //     for (let y = 0; y < numberOfRows; y++) {
  //       for (let x = 0; x < numberOfColumns; x++) {
  //         gridHTML += '<div class="grid-cell"></div>';
  //       }
  //     }

  //     document.getElementById(containerId).innerHTML = gridHTML;
  //   }

  content(board, id) {
    let canvas = document.getElementById(id);
    let ctx = canvas.getContext("2d");
    let size = 25;
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === 1) {
          ctx.rect(x * size, y * size, size, size);
          ctx.fillStyle = "black";
          ctx.fill();
        }
      }
    }
  }
}

class App {
  constructor(numberOfRows, numberOfColumns, canvasId) {
    this.rows = numberOfRows;
    this.columns = numberOfColumns;
    this.boardCreator = new CrateBoard();
    this.cellChecker = new CellChecker();
    this.draw = new Draw();
    this.currentBoard = this.boardCreator.fillTheBoardWithLivingCells(
      this.rows,
      this.columns,
      33
    );
    this.canvasId = canvasId;
  }

  nextGeneration() {
    let nextBoard = this.boardCreator.initializeEmptyBoard(
      this.rows,
      this.columns,
      0
    );
    for (let y = 0; y < this.currentBoard.length; y++) {
      for (let x = 0; x < this.currentBoard[y].length; x++) {
        let numberOfLivingCells = this.cellChecker.init(
          this.currentBoard,
          x,
          y
        );
        let currentCell = this.currentBoard[y][x];
        if (currentCell) {
          if (numberOfLivingCells < 2 || numberOfLivingCells > 3) {
            nextBoard[y][x] = 0;
          } else {
            nextBoard[y][x] = 1;
          }
        } else {
          if (numberOfLivingCells === 3) {
            nextBoard[y][x] = 1;
          } else {
            nextBoard[y][x] = 0;
          }
        }
      }
    }
    this.currentBoard = nextBoard;
  }

  reset() {
    this.currentBoard = this.boardCreator.fillTheBoardWithLivingCells(
      this.rows,
      this.columns,
      33
    );
  }

  init() {
    this.draw.blank(this.canvasId);
    this.draw.content(this.currentBoard, this.canvasId);
    this.draw.grid(20, 20, this.canvasId);
    this.nextGeneration();
  }
}
const app = new App(20, 20, "board");
