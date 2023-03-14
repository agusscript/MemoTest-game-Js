const squaresContainer = document.querySelector(".container");
const squares = squaresContainer.querySelectorAll("div");
const colors = ["red", "yellow", "orange", "blue", "pink", "green"];
let coupleSquares = [];
let arraySquares = [];
let round = 0;

function getRandomColors() {
  let copyArrayColors = colors.concat(colors);
  let shuffleArray = copyArrayColors.sort(() => Math.random() - 0.5);

  return shuffleArray;
}

function paintSquares() {
  let randomColors = getRandomColors();

  for (let i = 0; i < randomColors.length; i++) {
    squares[i].classList.add(randomColors[i]);
  }
}

function discoverSquare(square) {
  square.classList.remove("white");
}

function coverSquares() {
  squares.forEach(function (square) {
    square.classList.add("white");
  });
}

function deleteSquares(argument1, argument2) {
  argument1.style.pointerEvents = "none";
  argument2.style.pointerEvents = "none";
}

function pushSquares(argument1, argument2) {
  arraySquares.push(argument1);
  arraySquares.push(argument2);
}

function resetSquares(argument1, argument2) {
  setTimeout(() => {
    argument1.classList.add("white");
    argument2.classList.add("white");
  }, 400);
}

function getCoupleSquares(square) {
  coupleSquares.push(square);

  if (coupleSquares.length === 2) {
    compareSquares(coupleSquares[0], coupleSquares[1]);
    round++;
    coupleSquares = [];
  }
}

function compareSquares(square1, square2) {
  if (square1.className !== square2.className) {
    resetSquares(square1, square2);
  } else if (square1 === square2) {
    resetSquares(square1, square2);
  } else {
    deleteSquares(square1, square2);
    pushSquares(square1, square2);
  }
}

function notifyGameOver() {
  setTimeout(function () {
    if (arraySquares.length === 12) {
      return alert(`You won the game in ${round} rounds`);
    }
  }, 200);
}

function checkUserInput() {
  squares.forEach(function (square) {
    square.onclick = function () {
      discoverSquare(square);
      getCoupleSquares(square);
      notifyGameOver();
    };
  });
}

function playGame() {
  paintSquares();
  coverSquares();
  checkUserInput();
}

playGame();

document.querySelector(".restart-btn").onclick = function () {
  location.reload();
};
