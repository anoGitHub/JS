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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function solver() {
  let sudokuCopy = [...sudoku];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        let rowAndColumn = [
          checkRowForDuplicates(i),
          checkColumnForDuplicates(j),
          checkSquareForDuplicates(i, j),
        ].reduce((acc, curr) => acc.concat(curr), []);

        let unique = rowAndColumn
          .filter((element, index) => {
            return rowAndColumn.indexOf(element) === index;
          })
          .sort();
        // console.log(unique);
        const options = [];
        numbers.some((element) => {
          if (unique.indexOf(element) == -1) {
            options.push(element);
          }
        });
        console.log(options);
        if (options.length === 1) {
          sudokuCopy[i][j] === options[0];
        }
      }
    }
  }
  return sudokuCopy;
}

function checkRowForDuplicates(rowNumber) {
  // collects all used numbers in a row
  let tableWithUsedNumbersInRow = [];
  for (let j = rowNumber; j < 9; j++) {
    if (sudoku[rowNumber][j] != 0) {
      tableWithUsedNumbersInRow.push(sudoku[rowNumber][j]);
    }
  }
  return tableWithUsedNumbersInRow;
}

function checkColumnForDuplicates(columnNumber) {
  // collects all used numbers in a column
  let tableWithUsedNumbersInColumn = [];
  for (let i = columnNumber; i < 9; i++) {
    if (sudoku[i][columnNumber] != 0) {
      tableWithUsedNumbersInColumn.push(sudoku[i][columnNumber]);
    }
  }
  return tableWithUsedNumbersInColumn;
}

function checkSquareForDuplicates(row, col) {
  // 0,0; 0,3; 0,6; 3,0; 3,3; 3,6; 6,0; 6,3; 6,6.
  let tableWithUsedNumbersInSquare = [];
  switch (row) {
    case 0:
    case 1:
    case 2:
      row = 0;
      break;
    case 3:
    case 4:
    case 5:
      row = 1;
      break;
    case 6:
    case 7:
    case 8:
      row = 2;
      break;
    default:
      console.log("wrong number row " + row);
  }
  switch (col) {
    case 0:
    case 1:
    case 2:
      col = 0;
      break;
    case 3:
    case 4:
    case 5:
      col = 1;
      break;
    case 6:
    case 7:
    case 8:
      col = 2;
      break;
    default:
      console.log("wrong number col" + col);
  }
  const rowSquare = row * 3;
  const colSquare = col * 3;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (sudoku[rowSquare + row][colSquare + col] > 0) {
        tableWithUsedNumbersInSquare.push(
          sudoku[rowSquare + row][colSquare + col]
        );
      }
    }
  }
  return tableWithUsedNumbersInSquare;
}

// checkRowForDuplicates(0);
// checkColumnForDuplicates(0);
// checkSquareForDuplicates(2, 2);
// solver();
// console.log(tableWithUsedNumbersInColumn);
// console.log(tableWithUsedNumbersInSquare);
console.log(solver());
