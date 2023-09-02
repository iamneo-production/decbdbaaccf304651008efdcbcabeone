// JavaScript for Tic Tac Toe

// Define player symbols
let currentPlayer = 'X';

// Get all the grid cells
const cells = document.querySelectorAll('.bt');

// Function to handle a player's move
function handleMove(event) {
    const cell = event.target;

    // Check if the cell is empty
    if (!cell.value) {
        cell.value = currentPlayer;
        cell.classList.add(currentPlayer);

        // Check for a win or a draw
        if (checkWin() || checkDraw()) {
            // Handle game over
            handleGameOver();
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateResultText();
        }
    }
}

// Function to check for a win
function checkWin() {
    // Add your win condition logic here
}

// Function to check for a draw
function checkDraw() {
    // Add your draw condition logic here
}

// Function to handle the end of the game
function handleGameOver() {
    // Disable all cells
    cells.forEach(cell => cell.removeEventListener('click', handleMove));

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

    // Disable the reset button
    resetButton.disabled = true;

    // Re-add event listeners to cells
    cells.forEach(cell => cell.addEventListener('click', handleMove));
});

// Initial result text
updateResultText();