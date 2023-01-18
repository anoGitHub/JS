let sudoku = [
  [7, 0, 4, 8, 0, 0, 3, 0, 1],
  [8, 2, 0, 5, 0, 0, 0, 4, 0],
  [0, 0, 9, 4, 3, 0, 5, 0, 0],
  [3, 1, 0, 0, 0, 0, 8, 0, 7],
  [0, 8, 0, 0, 0, 0, 0, 1, 0],
  [9, 0, 7, 0, 0, 0, 0, 3, 2],
  [0, 0, 6, 0, 1, 5, 4, 0, 0],
  [0, 7, 0, 0, 0, 9, 0, 6, 5],
  [5, 0, 8, 0, 0, 2, 1, 0, 3],
];

let numbersAlreadyUsed = [];

function collectUsedNumbers(board, row, col) {
  numbersAlreadyUsed = [];
  for (let k = 0; k < 9; k++) {
    if (board[row][k] > 0) {
      numbersAlreadyUsed.push(board[row][k]);
    }
    if (board[k][col] > 0) {
      numbersAlreadyUsed.push(board[k][col]);
    }
  }
  const rowSquare = Math.floor(row / 3) * 3;
  const colSquare = Math.floor(col / 3) * 3;
  for (let ro = 0; ro < 3; ro++) {
    for (let co = 0; co < 3; co++) {
      if (board[rowSquare + ro][colSquare + co] > 0) {
        numbersAlreadyUsed.push(board[rowSquare + ro][colSquare + co]);
      }
    }
  }
  return numbersAlreadyUsed;
}

function solver(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      numbersAlreadyUsed = [];

      if (board[i][j] === 0) {
        collectUsedNumbers(board, i, j);

        let unique = numbersAlreadyUsed.filter(
          (element, index, arr) => arr.indexOf(element) === index
        );

        let options = [];
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        numbers.some((element) => {
          if (unique.indexOf(element) == -1) {
            options.push(element);
          }
        });

        if (options.length == 1) {
          board[i][j] = options[0];
          solver(board);
        }
      }
    }
  }
  return board;
}
console.log(solver(sudoku));
