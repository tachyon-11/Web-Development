var player1 = 0;
var player2 = 0;

function game() {
  let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const makeMove = (player, row, col) => {
    grid[row][col] = player;
  };

  const canMove = (row, col) => {
    return grid[row][col] === 0;
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (
        grid[i][0] === grid[i][1] &&
        grid[i][1] === grid[i][2] &&
        grid[i][0] !== 0
      ) {
        return grid[i][0];
      }
      if (
        grid[0][i] === grid[1][i] &&
        grid[1][i] === grid[2][i] &&
        grid[0][i] !== 0
      ) {
        return grid[0][i];
      }
    }
    if (
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2] &&
      grid[0][0] !== 0
    ) {
      return grid[0][0];
    }

    if (
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0] &&
      grid[0][2] !== 0
    ) {
      return grid[0][2];
    }

    return -1;
  };

  return {
    makeMove,
    canMove,
    checkWinner,
  };
}

function createGrid() {
  newGame = game();
  const gameGrid = document.createElement("div");
  gameGrid.className = "gameGrid";
  for (let i = 0; i < 9; i++) {
    let gameCell = document.createElement("div");
    gameCell.addEventListener("click", () => {
      if (gameCell.textContent === "X" || gameCell.textContent === "O") {
        return;
      }

      let row = Math.floor(i / 3);
      let col = i % 3;

      if (!newGame.canMove(row, col)) {
        return;
      }

      newGame.makeMove(currPlayer, row, col);
      gameCell.textContent = currPlayer;
      moves++;

      const moveEvent = new CustomEvent("moveMade", { detail: { moves } });
      document.dispatchEvent(moveEvent);

      currPlayer = currPlayer === "X" ? "O" : "X";
    });
    gameGrid.appendChild(gameCell);
  }

  return gameGrid;
}

const scoreCard = document.querySelector(".score-card");
const gameBoard = document.querySelector(".game");
var currPlayer = "X";
var moves = 0;
var newGame = game();

function resetGame() {
  gameBoard.replaceChildren();
  gameBoard.appendChild(createGrid());
  gameBoard.appendChild(popup);
  currPlayer = "X";
  moves = 0;
}

const player1Score = document.createElement("div");
player1Score.className = "player-score";
player1Score.textContent = player1;

const player2Score = document.createElement("div");
player2Score.className = "player-score";
player2Score.textContent = player2;

const resetButton = document.createElement("button");
resetButton.textContent = "RESET";
resetButton.addEventListener("click", () =>{
  resetGame();
});

scoreCard.appendChild(player1Score);
scoreCard.appendChild(resetButton);
scoreCard.appendChild(player2Score);

var popup = document.createElement("dialog");
var closeBtn = document.createElement("button");
closeBtn.textContent = "Close";
closeBtn.addEventListener("click", () => {
  resetGame();
  popup.close();
  popup.replaceChildren();
});

gameBoard.appendChild(createGrid());
gameBoard.appendChild(popup);

document.addEventListener("moveMade", (event) => {
  console.log(`Number of moves: ${event.detail.moves}`);
  let winner = newGame.checkWinner();
  if (winner === "X" || winner === "O") {
    setTimeout(() => {
      let message = `Player ${winner} wins!`;
      let newMessage = document.createElement("p");
      newMessage.textContent = message;
      popup.appendChild(newMessage);
      popup.appendChild(closeBtn);
      popup.showModal();

      if (winner === "X") {
        player1++;
        player1Score.textContent = player1;
      } else {
        player2++;
        player2Score.textContent = player2;
      }
    }, 0);
  } else if (event.detail.moves === 9) {
    let message = "Tie!!!";
    let newMessage = document.createElement("p");
    newMessage.textContent = message;
    popup.appendChild(newMessage);
    popup.appendChild(closeBtn);
    popup.showModal();
  }
});
