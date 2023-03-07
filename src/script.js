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

function resetSquares() {
  setTimeout(function () {
    coupleSquares[0].classList.add("white");
    coupleSquares[1].classList.add("white");
  }, 220);
}

function deleteSquares() {
  coupleSquares[0].style.pointerEvents = "none";
  coupleSquares[1].style.pointerEvents = "none";
}

function pushSquares() {
  arraySquares.push(coupleSquares[0]);
  arraySquares.push(coupleSquares[1]);
}

function notifyGameOver() {
  setTimeout(function () {
    if (arraySquares.length === 12) {
      alert(`You won the game in ${round} rounds`);
    }
  }, 400);
}

function getCoupleSquares(square) {
  coupleSquares.push(square);

  if (coupleSquares.length === 2) {
    if (coupleSquares[0].className !== coupleSquares[1].className) {
      resetSquares();
    } else if (coupleSquares[0] === coupleSquares[1]) {
      resetSquares();
    } else {
      deleteSquares();
      pushSquares();
    }
    round++;
  }

  if (coupleSquares.length > 2) {
    coupleSquares = [];
    coupleSquares.push(square);
  }
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
