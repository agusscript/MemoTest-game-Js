const URL = "127.0.0.1:8080";

context("memoTest", () => {
  before(() => {
    cy.visit(URL);
  });

  const squaresNum = 12;

  it("find 12 squares", () => {
    cy.get(".container").find(".square").should("have.length", squaresNum);
  });

  it("check if the squares are random", () => {
    cy.get(".square").then((squares) => {
      let originalClasses = [];
      squares.each(function (i, square) {
        originalClasses.push(square.className);
      });

      cy.visit(URL);
  
      cy.get(".square").then((newSquares) => {
        let newClasses = [];
        newSquares.each(function (i, square) {
          newClasses.push(square.className);
        });
  
        cy.wrap(originalClasses).should("not.deep.equal", newClasses);
      });
    });
  });

  describe("solve the game", () => {
    let pairMap, pairList;
    it("choose a wrong combination", () => {
      cy.get(".square").then(squares => {
        pairMap = getPairSquares(squares);
        pairList = Object.values(pairMap);

        console.log(pairList);
        cy.get(pairList[0][0]).click();
        cy.get(pairList[1][0]).click();

        cy.get(".square").should("have.length", 12);
      });
    });

    it("solve the game", () => {
      cy.get(".square").should("have.length", 12);

      pairList.forEach((pair) => {
        cy.get(pair[0]).click();
        cy.get(pair[1]).click();
      });

      cy.get(".square").should("have.length", 12);
      cy.get(".square").should("have.css", "pointer-events", "none");
    });

    it("test end game alert", () => {
      const roundsNum = squaresNum / 2 + 1;
      cy.on("window:alert", (str) => {
        expect(str).to.equal(`You won the game in ${roundsNum} rounds`);
      });
    });
  });
});

function getPairSquares(squares) {
  const pair = {};

  squares.each((i, square) => {
    const colorClass = square.className.replace("square", "");

    if (pair[colorClass]) {
      pair[colorClass].push(square);
    } else {
      pair[colorClass] = [square];
    }
  });

  console.log(pair);
  return pair;
}

 
