// JavaScript for Tic Tac Toe

// Define player symbols
let currentPlayer = 'X';
let gameActive = true;

// Get all the grid cells
const cells = document.querySelectorAll('.bt');

// Function to handle a player's move
function handleMove(event) {
    const cell = event.target;

    // Check if the cell is empty and the game is active
    if (!cell.value && gameActive) {
        cell.value = currentPlayer;
        cell.classList.add(currentPlayer);

        // Check for a win or a draw
        if (checkWin()) {
            // Handle game over
            handleGameOver(`Player ${currentPlayer} Won`);
        } else if (checkDraw()) {
            // Handle a draw
            handleGameOver("It's a draw!");
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateResultText();
        }
    }
}

// Function to check for a win
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].value &&
            cells[a].value === cells[b].value &&
            cells[a].value === cells[c].value
        ) {
            return true; // We have a winner
        }
    }

    return false; // No winner yet
}

// Function to check for a draw
function checkDraw() {
    return [...cells].every(cell => cell.value !== '');
}

// Function to handle the end of the game
function handleGameOver(message) {
    gameActive = false;
    
    // Disable all cells
    cells.forEach(cell => cell.removeEventListener('click', handleMove));

    // Show the game result
    const resultText = document.querySelector('.result-text');
    resultText.textContent = message;

    // Enable the reset button
    const resetButton = document.getElementById('reset-button');
    resetButton.disabled = false;
}

// Function to update the result text
function updateResultText() {
    const resultText = document.querySelector('.result-text');
    resultText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Event listeners for each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleMove);
});

// Event listener for the reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    // Reset the game board and variables
    cells.forEach(cell => {
        cell.value = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    updateResultText();
    gameActive = true;

    // Disable the reset button
    resetButton.disabled = true;

    // Re-add event listeners to cells
    cells.forEach(cell => cell.addEventListener('click', handleMove));
});

// Initial result text
updateResultText();
