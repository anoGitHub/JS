let balls = [2, 1, 1, 1, 1, 1, 1, 1];

function sumArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}
function balance() {
  // divide into 3
  let balls123 = balls.slice(0, 3);
  let balls456 = balls.slice(3, 6);
  let balls78 = balls.slice(6);

  // balance
  if (sumArray(balls123) === sumArray(balls456)) {
    // heavy ball is in balls78
    if (balls78[0] > balls78[1]) {
      return 7;
    } else return 8;
  } else if (sumArray(balls123) > sumArray(balls456)) {
    // heavy ball is in balls123
    if (balls123[0] === balls123[1]) {
      return 3;
    } else if (balls123[0] > balls123[1]) {
      return 1;
    } else {
      return 2;
    }
  } else {
  } // heavy ball is in balls456
  if (balls456[0] === balls456[1]) {
    return 6;
  } else if (balls456[0] > balls456[1]) {
    return 4;
  } else return 5;
}

console.log(balance());
