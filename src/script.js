const squaresContainer = document.querySelector(".container");
const squares = squaresContainer.querySelectorAll("div");
const colors = ["red", "yellow", "orange", "blue", "pink", "green"];
let coupleSquares = [];

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

function coverSquares() {
  squares.forEach(function (square) {
    square.classList.add("white");
  });
}

function resetSquares() {
  setTimeout(function () {
    coupleSquares[0].classList.add("white");
    coupleSquares[1].classList.add("white");
  }, 400);
}

function deleteSquares() {
  setTimeout(function () {
    coupleSquares[0].style.pointerEvents = "none";
    coupleSquares[1].style.pointerEvents = "none";
  }, 400);
}

function getCoupleSquares(square) {
  coupleSquares.push(square);

  if (coupleSquares.length === 2) {
    if (coupleSquares[0].className !== coupleSquares[1].className) {
      resetSquares();
    } else {
      deleteSquares();
    }
  }

  if (coupleSquares.length > 2) {
    coupleSquares = [];
    coupleSquares.push(square);
  } 
}

function checkUserInput() {
  squares.forEach(function (square) {
    square.onclick = function () {

      square.classList.remove("white");

      getCoupleSquares(square);
    };
  });
}

paintSquares();

coverSquares();

checkUserInput();
