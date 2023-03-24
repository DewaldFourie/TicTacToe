
// Const global
const blocks = document.querySelectorAll('.block');
const turnDisplay = document.querySelector('.user-info');

// Geme Board Module IFFE 
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


const playerDesign = (name, marking) => {
    return {name, marking}
}

// Create two players with playerDesign Factory Function and set default to player 1
const playerOne = playerDesign('Player 1', 'O');
const playerTwo = playerDesign('Player 2', 'X');
let currentPlayer = playerOne;


// get each block in the display and add an event listener that points to the blockClicked Function
const displayBoard = () => {
    blocks.forEach((block) => {
        block.addEventListener('click', blockClicked);
    })
}

// the function that handles what happens when the user clicks a block 
const blockClicked = (e) => {
    const id = e.target.id;
    if ( gameBoard.getBoard()[id] === null){
        gameBoard.makeMove(currentPlayer['marking'], id)
        e.target.textContent = currentPlayer['marking']
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        turnDisplay.textContent = currentPlayer['name']+ "'s Turn";
    }
    else {
        turnDisplay.textContent = "Oops, can't put there"
    }
    console.log(gameBoard.getBoard())
    console.log(gameBoard.getBoard()[id])
    
}


displayBoard();
console.log(gameBoard.getBoard())
