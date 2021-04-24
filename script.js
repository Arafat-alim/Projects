console.log("Processing");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
// let statusDisplay = document.querySelector("#game--status");
let statusDisplay = document.getElementById('game--status');

function handleRestartGame(){
    // alert("CLicked")
    gameActive=true;
    currentPlayer= "X";
    gameState = ["","","","","","","","",""];
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
    statusDisplay.innerHTML = `It's ${currentPlayer} Turn`;
}
// Access Index 
function handleCellClick(clickEvent){
    // console.log(event)
    const clickedCell = clickEvent.target;
    const clickCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); //index getting 
    if(gameState[clickCellIndex] != "" || !gameActive){
        return;
    }
    // console.log(clickCell);
    handleCellPlayer(clickedCell, clickCellIndex); //calling function
    handleResultValidation(); //whenever cell is clicked
    if(gameState[clickCellIndex] != "" || !gameActive){
    return;
}
}


function handleCellPlayer(clickedCell, clickCellIndex){ //run this function .... created a function
    gameState[clickCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningCondtion = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function handleResultValidation(){
    let roundWon = false;
    for(let i=0;i<=7;i++)
    {
        const winCondtion = winningCondtion[i];
        let a = gameState[winCondtion[0]];
        let b = gameState[winCondtion[1]];
        let c = gameState[winCondtion[2]];

        if(a === "" || b === "" || c === "")
        {
            continue;
        }
        if(a === b && b ===c )
        {
            roundWon = true;
            break;
        }
    }
    
    if(roundWon){
        statusDisplay.innerHTML = `Player ${currentPlayer} has Won this match, Congratulations! `;
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = "Its a Draw";
        gameActive= false;
        return;
    }

    handlePlayerChange();
}
function handlePlayerChange(){
    // if(currentPlayer === "X"){
    //     currentPlayer = "O";
    // }else{
    //     currentPlayer = 'X';
    // }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Its ${currentPlayer}'s Turn`; 
}

document.querySelector(".game-restart").addEventListener("click",handleRestartGame);
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click",handleCellClick));