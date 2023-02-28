const squaresContainer = document.querySelector(".container");
const squares = squaresContainer.querySelectorAll("div");
const colors = ["red", "yellow", "orange", "blue", "pink", "green"];

function getRandomColors() {
  let copyArrayColors = colors.slice(0);
  copyArrayColors.sort(() => Math.random() - 0.5);

  return copyArrayColors.concat(copyArrayColors);
}

function paintSquares() {
  let randomColors = getRandomColors();

  for (let i = 0; i < randomColors.length; i++) {
    squares[i].classList.add(randomColors[i]);
  }

  squares.forEach(function (square) {
    square.classList.add("white");

    square.onclick = function () {
      square.classList.remove("white");
    };
  });
}

paintSquares();

