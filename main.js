
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

let currentPlayer = "X"
function playerMove(block, marking) {
    block.addEventListener('click', () => {
        marking.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }) 
}



// Function to dislay the grid 
function dislayGrid() {
    let grid = document.querySelector(".board")

    for (i = 0; i < gameBoard.getBoard().length; i++){
        let block = document.createElement('div');
        block.classList.add('block');


        let marking = document.createElement('p');
        marking.classList.add('marking');
        playerMove(block, marking);
          


        block.appendChild(marking);
        grid.appendChild(block);
    }

}


dislayGrid();
console.log(gameBoard.getBoard())