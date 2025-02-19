const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const closePopup = document.getElementById("close-popup");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function handleClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.style.color = currentPlayer === "X" ? "#00ffcc" : "#00cc99";

    checkWin();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
            highlightWinner(pattern);
            showPopup(`🎉 Player ${currentPlayer} Wins!`);
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw! 🤝";
        showPopup("🤝 It's a Draw!");
    }
}

function highlightWinner(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add("winner");
    });
}

function showPopup(message) {
    popupText.textContent = message;
    popup.style.display = "flex";
}

closePopup.addEventListener("click", function () {
    popup.style.display = "none";
    resetGame();
});

function resetGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's turn`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
