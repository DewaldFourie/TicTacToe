
// Const global
const blocks = document.querySelectorAll('.block');
const turnDisplay = document.querySelector('.user-info');
const restartBtn = document.querySelector('#restartBtn');

// Game Board Module IFFE 
const gameBoard = (() => {
    let board = new Array(9).fill(null);

    const getBoard = () => board;

    const makeMove = (player, position) => {
        if(board[position] === null){
            board[position] = player;
            return true;
        }
        else {
            return false;
        }
    }

    const resetBoard = () => {
        board = new Array(9).fill(null);
    }

    return {
        getBoard,
        makeMove,
        resetBoard
    }
})();


const playerDesign = (name, marking, color) => {
    return {name, marking, color}
}

// Create two players with playerDesign Factory Function and set default to player 1
const playerOne = playerDesign('Player O', 'O', 'blue');
const playerTwo = playerDesign('Player X', 'X', 'red');
let currentPlayer = playerOne;


// get each block in the display and add an event listener that points to the blockClicked Function
const displayBoard = () => {
    blocks.forEach((block) => {
        block.addEventListener('click', blockClicked);
    })
    restartBtn.addEventListener('click', restartClicked);
}

// the function that handles what happens when the user clicks a block 
const blockClicked = (e) => {
    const id = e.target.id;
    if ( gameBoard.getBoard()[id] === null){
        gameBoard.makeMove(currentPlayer['marking'], id)
        e.target.textContent = currentPlayer['marking']
        e.target.style.color = currentPlayer['color']
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        turnDisplay.textContent = currentPlayer['name']+ "'s Turn";
    }
    else {
        alert("Oops, can't put there")
    }

    if (checkForDraw(gameBoard.getBoard())){
        console.log("draw")
    }
    checkForWin(playerOne['marking'], playerTwo['marking'])
}
    



// Function to reset the board if restart button is clicked
const restartClicked = (e) => {
    displayBoard();
    gameBoard.resetBoard();
    blocks.forEach((block) => {
        block.textContent = ''
        block.style.backgroundColor = ''
    });
    turnDisplay.textContent = currentPlayer['name'] + ' Starts'
}

// Function to check if player one or player two wins
const checkForWin = (player1, player2) => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical wins
        [0, 4, 8], [2, 4, 6]              // Diagonal wins
    ]

    function computeResult(player, comboIndex) {
        turnDisplay.textContent = 'Player ' + player + ' Wins !!!';
        const winningCombo = winningCombos[comboIndex];
        winningCombo.forEach((index) => {
            blocks[index].style.backgroundColor = 'lightgreen'
        })  
        blocks.forEach((block) => {
            block.removeEventListener('click', blockClicked)
        })
    }


    for (let i = 0; i < winningCombos.length; i++){
        const [a, b, c] = winningCombos[i]
        if (gameBoard.getBoard()[a] === player1 && gameBoard.getBoard()[b] === player1
            && gameBoard.getBoard()[c] === player1){    
            computeResult(player1, i);
        }
        else if (gameBoard.getBoard()[a] === player2 && gameBoard.getBoard()[b] === player2
            && gameBoard.getBoard()[c] === player2){ 
            computeResult(player2, i);
        }

    }
}

// Function to check for a draw
const checkForDraw = (board) => {
    if (board.includes(null)){
        return false
    }
    blocks.forEach((block) => block.removeEventListener('click', blockClicked))
    turnDisplay.textContent = "It's a Draw, Play again!"
    return true
}


displayBoard();

