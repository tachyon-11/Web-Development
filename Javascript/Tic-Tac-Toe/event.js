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

const newGame = game();

const scoreCard = document.querySelector(".score-card");
const gameBoard = document.querySelector(".game");

const player1Score = document.createElement("div");
player1Score.className = "player-score";
player1Score.textContent = player1;

const player2Score = document.createElement("div");
player2Score.className = "player-score";
player2Score.textContent = player2;

scoreCard.appendChild(player1Score);
scoreCard.appendChild(player2Score);

var currPlayer = "1";
var moves = 0;

function createGrid() {
  const gameGrid = document.createElement("div");
  gameGrid.className = "gameGrid";
  for (let i = 0; i < 9; i++) {
    let gameCell = document.createElement("div");
    gameCell.addEventListener("click", () => {
      if (gameCell.textContent === "1" || gameCell.textContent === "2") {
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

      currPlayer = currPlayer === "1" ? "2" : "1";
    });
    gameGrid.appendChild(gameCell);
  }

  return gameGrid;
}

gameBoard.appendChild(createGrid());

const popup = document.createElement("dialog");
const closeBtn = document.createElement("button");
closeBtn.textContent = "Close";
closeBtn.addEventListener("click", () => {
  gameBoard.replaceChildren();
  gameBoard.appendChild(createGrid());
  popup.close();
});

popup.appendChild(closeBtn);

gameBoard.appendChild(popup);

document.addEventListener("moveMade", (event) => {
  console.log(`Number of moves: ${event.detail.moves}`);
  let winner = newGame.checkWinner();
  console.log(winner);

  if (winner === "1" || winner === "2") {
    setTimeout(() => {
      let message = `Player ${winner} wins!`;
      let newMessage = document.createElement("p");
      newMessage.textContent = message;
      popup.appendChild(newMessage);
      popup.showModal();

      if(winner==="1"){
        player1++;
        player1Score.textContent = player1;
      }
      else{
        player2++;
        player2Score.textContent = player2;
      }
    }, 0);
  } else if (event.detail.moves === 9) {
    setTimeout(() => {
      alert("Game Over! It's a tie.");
    }, 0);
  }
});
