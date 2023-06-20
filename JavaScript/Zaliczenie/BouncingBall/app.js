const board = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "1", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "0", "X"],
  ["X", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

class DirectionSet {
  upLeft(position, board) {
    let x = position[0] - 1;
    let y = position[1] - 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }

  upRight(position, board) {
    let x = position[0] + 1;
    let y = position[1] - 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }

  downLeft(position, board) {
    let x = position[0] - 1;
    let y = position[1] + 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }

  downRight(position, board) {
    let x = position[0] + 1;
    let y = position[1] + 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }

  randomDirection(direction) {
    let possibleDirections;
    if (direction === this.downRight) {
      possibleDirections = [this.upRight, this.downLeft, this.downRight];
    } else if (direction === this.downLeft) {
      possibleDirections = [this.upLeft, this.downLeft, this.downRight];
    } else if (direction === this.upRight) {
      possibleDirections = [this.upLeft, this.upRight, this.downRight];
    } else if (direction === this.upLeft) {
      possibleDirections = [this.upLeft, this.upRight, this.downLeft];
    }
    let randomizer = Math.floor(Math.random() * possibleDirections.length);
    return possibleDirections[randomizer];
  }
}

class obstaclesDetector {
  detectWalls(board, position) {
    let y = position[1];
    let x = position[0];
    let wall = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    if (board[y][x - 1] === "X") {
      wall.left = true;
    }
    if (board[y - 1][x] === "X") {
      wall.up = true;
    }
    if (board[y][x + 1] === "X") {
      wall.right = true;
    }
    if (board[y + 1][x] === "X") {
      wall.down = true;
    }
    return wall;
  }

  detectCorners(board, position) {
    let y = position[1];
    let x = position[0];
    let corner = {
      upRight: false,
      upLeft: false,
      downLeft: false,
      downRight: false,
    };
    if (
      board[y - 1][x + 1] === "X" &&
      board[y - 1][x] !== "X" &&
      board[y][x + 1] !== "X"
    ) {
      corner.upRight = true;
    }
    if (
      board[y - 1][x - 1] === "X" &&
      board[y - 1][x] !== "X" &&
      board[y][x - 1] !== "X"
    ) {
      corner.upLeft = true;
    }
    if (
      board[y + 1][x - 1] === "X" &&
      board[y + 1][x] !== "X" &&
      board[y][x - 1] !== "X"
    ) {
      corner.downLeft = true;
    }
    if (
      board[y + 1][x + 1] === "X" &&
      board[y + 1][x] !== "X" &&
      board[y][x + 1] !== "X"
    ) {
      corner.downRight = true;
    }
    return corner;
  }

  run(board, position) {
    let wall = this.detectWalls(board, position);
    let corners = this.detectCorners(board, position);
    let corner = {
      upRight: false,
      upLeft: false,
      downLeft: false,
      downRight: false,
    };
    if ((wall.left && wall.up) || corners.upLeft) {
      corner.upLeft = true;
    }
    if ((wall.left && wall.down) || corners.downLeft) {
      corner.downLeft = true;
    }
    if ((wall.right && wall.up) || corners.upRight) {
      corner.upRight = true;
    }
    if ((wall.right && wall.down) || corners.downRight) {
      corner.downRight = true;
    }
    let result = Object.assign(corner, wall);
    return result;
  }
}

class PositionFinder {
  run(board) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === "1") {
          return [x, y];
        }
      }
    }
  }
}

class TextureSet {
  constructor(directory, wallSrc, ballSrc, portalSrc) {
    this.directory = directory;
    this.wallSrc = wallSrc;
    this.ballSrc = ballSrc;
    this.portalSrc = portalSrc;
  }

  create() {
    let wall = new Image();
    wall.src = this.directory + this.wallSrc;
    let ball = new Image();
    ball.src = this.directory + this.ballSrc;
    let portal = new Image();
    portal.src = this.directory + this.portalSrc;
    const background = (canvasId) => {
      document.getElementById(canvasId).style.background = `url(${
        this.directory + this.backgroundSrc
      })`;
    };
    return {
      wall,
      ball,
      portal,
      background,
    };
  }
}

class App {
  constructor(board, canvasId, textures) {
    this.vector = new DirectionSet();
    this.wall = new obstaclesDetector();
    this.positionFinder = new PositionFinder();
    this.board = board;
    this.canvasId = canvasId;
    this.currentVector = this.vector.downRight;
    this.position = this.positionFinder.run(this.board);
    this.finishCondition = this.positionFinder.run(this.board);
    this.previousDraw;
    this.currentInterval;
    this.wallImage = textures.wall;
    this.ballImage = textures.ball;
    this.portalImage = textures.portal;
    this.finishImage = textures.finish;
  }
  clearCanvas() {
    let canvas = document.getElementById(this.canvasId);
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      for (let y = 0; y < this.board.length; y++) {
        for (let x = 0; x < this.board[y].length; x++) {
          let renderX = x * 50;
          let renderY = y * 50;
          ctx.clearRect(renderX, renderY, 50, 50);
        }
      }
    }
  }

  draw() {
    let canvas = document.getElementById(this.canvasId);
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      for (let y = 0; y < this.board.length; y++) {
        for (let x = 0; x < this.board[y].length; x++) {
          let renderX = x * 50;
          let renderY = y * 50;
          if (this.board[y][x] === "X") {
            ctx.drawImage(this.wallImage, renderX, renderY, 50, 50);
          }
          if (this.board[y][x] === "1") {
            ctx.drawImage(this.ballImage, renderX, renderY, 50, 50);
          }
          if (this.board[y][x] === "Y") {
            ctx.drawImage(this.portalImage, renderX, renderY, 50, 50);
          }
          if (this.board[y][x] === "0") {
            ctx.clearRect(renderX, renderY, 50, 50);
          }
        }
      }
      ctx.drawImage(
        this.finishImage,
        this.finishCondition[0] * 50,
        this.finishCondition[1] * 50,
        50,
        50
      );
    }
  }

  bounce() {
    let bounce = this.wall.run(this.board, this.position);
    if (this.currentVector === this.vector.upLeft && bounce.upLeft) {
      this.currentVector = this.vector.downRight;
    } else if (this.currentVector === this.vector.downLeft && bounce.downLeft) {
      this.currentVector = this.vector.upRight;
    } else if (this.currentVector === this.vector.upRight && bounce.upRight) {
      this.currentVector = this.vector.downLeft;
    } else if (
      this.currentVector === this.vector.downRight &&
      bounce.downRight
    ) {
      this.currentVector = this.vector.upLeft;
    } else if (this.currentVector === this.vector.upLeft && bounce.left) {
      this.currentVector = this.vector.upRight;
    } else if (this.currentVector === this.vector.upLeft && bounce.up) {
      this.currentVector = this.vector.downLeft;
    } else if (this.currentVector === this.vector.upRight && bounce.right) {
      this.currentVector = this.vector.upLeft;
    } else if (this.currentVector === this.vector.upRight && bounce.up) {
      this.currentVector = this.vector.downRight;
    } else if (this.currentVector === this.vector.downLeft && bounce.left) {
      this.currentVector = this.vector.downRight;
    } else if (this.currentVector === this.vector.downLeft && bounce.down) {
      this.currentVector = this.vector.upLeft;
    } else if (this.currentVector === this.vector.downRight && bounce.right) {
      this.currentVector = this.vector.downLeft;
    } else if (this.currentVector === this.vector.downRight && bounce.down) {
      this.currentVector = this.vector.upRight;
    }
  }

  move() {
    this.bounce();
    let nextPosition = this.currentVector(this.position, this.board);
    if (this.board[nextPosition[1]][nextPosition[0]] === "0") {
      this.board[nextPosition[1]][nextPosition[0]] = "1";
      this.board[this.position[1]][this.position[0]] = "0";
      this.position = [nextPosition[0], nextPosition[1]];
    } else if (this.board[nextPosition[1]][nextPosition[0]] === "Y") {
      this.board[nextPosition[1]][nextPosition[0]] = "1";
      this.board[this.position[1]][this.position[0]] = "0";
      this.position = [nextPosition[0], nextPosition[1]];
      this.currentVector = this.vector.randomDirection(this.currentVector);
    }
    this.draw();
  }

  animate(speed) {
    this.currentInterval = setInterval(() => {
      this.move();
      if (
        this.position[0] === this.finishCondition[0] &&
        this.position[1] === this.finishCondition[1]
      ) {
        this.stopAnimate();
      }
    }, speed);
  }

  stopAnimate() {
    clearInterval(this.currentInterval);
  }
}

const imagesSet = new TextureSet(
  "./textures/images/",
  "soil.png",
  "ball.png",
  "check.png",
  "start.png"
).create();

const app = new App(board, "board", imagesSet);
