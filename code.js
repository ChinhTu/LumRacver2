const rows = 12;
const columns = 13;
const blackPoints = 5;
let redPoint = {
  redX: 0,
  redY: 0,
};
const arrBlackPoint = [];
let isStartGame = false;

const $ = (value) => {
  return document.getElementById(value);
};

const randomInteger = () => {
  return Math.floor(Math.random() * rows);
};

function Check(x, y) {
  let check = false;
  for (let i = 0; i < arrBlackPoint.length; i++) {
    if (arrBlackPoint[i].x == x && arrBlackPoint[i].y == y) {
      check = true;
      break;
    }
  }
  return check;
}

const randomArrBlackPoints = () => {
  for (let i = 0; i < blackPoints; i++) {
    const x = randomInteger();
    const y = randomInteger();
    if (!Check(x, y)) {
      arrBlackPoint.push({ x, y });
    }
  }
};

const board = $("board");

const ReloadGround = () => {
  $("playGround").remove();
  const playGround = document.createElement("div");
  playGround.setAttribute("id", "playGround");
  playGround.setAttribute("class", "play-ground");
  board.append(playGround);
  for (let i = 0; i <= rows; i++)
    for (let j = 0; j <= columns; j++) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      square.setAttribute("data-x", i);
      square.setAttribute("data-y", j);

      if (isStartGame) {
        if (i === redPoint.redX && j === redPoint.redY) {
          const red = document.createElement("div");
          red.setAttribute("class", "red");
          square.append(red);
        }
        if (Check(i, j)) {
          const black = document.createElement("div");
          black.setAttribute("class", "black");
          square.append(black);
        }
      }
      playGround.append(square);
    }
};
ReloadGround();

const upBtn = $("up");
const downBtn = $("down");
const leftBtn = $("left");
const rightBtn = $("right");

const handleUp = () => {
  if (redPoint.redX > 0) {
    redPoint.redX--;
    ReloadGround();
  }
};

const handleDown = () => {
  if (redPoint.redX < rows) {
    redPoint.redX++;
    ReloadGround();
  }
};

const handleLeft = () => {
  if (redPoint.redY > 0) {
    redPoint.redY--;
    ReloadGround();
  }
};

const handleRight = () => {
  if (redPoint.redY < columns) {
    redPoint.redY++;
    ReloadGround();
  }
};

const handlePickup = () => {
  arrBlackPoint.map((item) => {
    if (item.x == redPoint.redX && item.y == redPoint.redY) {
      arrBlackPoint.splice(arrBlackPoint.indexOf(item), 1);
      ReloadGround();
    }
    if (arrBlackPoint.length == 0) {
      alert("You Win");
    }
  });
};

window.onkeyup = function (e) {
  if (isStartGame) {
    e.keyCode === 38 && handleUp();

    e.keyCode === 40 && handleDown();

    e.keyCode === 39 && handleRight();

    e.keyCode === 37 && handleLeft();

    e.keyCode === 65 && handlePickup();

    e.keyCode === 83 && handleStartGame();
  }
};

const handleStartGame = () => {
  isStartGame = true;
  alert("Start Game");
  randomArrBlackPoints();
  ReloadGround();
};
