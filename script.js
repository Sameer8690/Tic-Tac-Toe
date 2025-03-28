const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  // Check if the cell is already occupied or the game is inactive
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // Update the game state and UI
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer); // Add class for styling (X or O)

  // Check for a winner or tie
  checkForWinner();
}

function checkForWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] === "" ||
      gameState[b] === "" ||
      gameState[c] === ""
    ) {
      continue;
    }
    if (
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      roundWon = true;
      // Highlight winning cells
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  // Check for a tie
  if (!gameState.includes("")) {
    statusText.textContent = "It's a tie! 🤝";
    gameActive = false;
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winner"); // Remove all styling classes
  });
}

// Add event listeners to cells
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Add event listener to reset button
resetButton.addEventListener("click", resetGame);