const allCells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset');
const text = document.getElementById('text');
const statusTxt = document.getElementById('statusTxt');
const gif = document.getElementById('gif');
const strike = document.getElementById('strike');


let currentPlayer = 'O';

startGame();
function startGame() {
    allCells.forEach(cell => { cell.addEventListener('click', cellClicked) })
    resetBtn.addEventListener('click', restartGame);
    statusTxt.textContent = `Player ${currentPlayer} turn first`;
}

function restartGame() {
    strike.className = 'strike';
    allCells.forEach(cell => {
        cell.innerHTML = "";
    })
    statusTxt.style.fontWeight = 'unset';
    text.classList.remove('none');
    gif.style.width = '0px';
    startGame();

}

function cellClicked(e) {
    if (!text.classList.contains('none')) {
        text.classList.add('none');
    }
    const turnDisplay = document.createElement('div');

    turnDisplay.classList.add(currentPlayer);

    e.target.append(turnDisplay);

    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    statusTxt.textContent = `Player ${currentPlayer}'s turn.`;

    e.target.removeEventListener('click', cellClicked);
    checkWinner();
}
const winningCombos = [
    { combo: [0, 1, 2], strikeCLass:'strike-row-1' }, 
    { combo: [3, 4, 5], strikeCLass:'strike-row-2' }, 
    { combo: [6, 7, 8], strikeCLass:'strike-row-3' },
    { combo: [0, 3, 6], strikeCLass:'strike-column-1' }, 
    { combo: [1, 4, 7], strikeCLass:'strike-column-2' }, 
    { combo: [2, 5, 8], strikeCLass:'strike-column-3' },
    { combo: [0, 4, 8], strikeCLass:'strike-dia-1' }, 
    { combo: [2, 4, 6], strikeCLass:'strike-dia-2' },
]
function checkWinner(){
    for(const condition of winningCombos){
        const {combo,strikeCLass} = condition;
        const cellVal1 = allCells[combo[0]];
        const cellVal2 = allCells[combo[1]];
        const cellVal3 = allCells[combo[2]];
        
        if(cellVal1.firstChild?.classList.contains('O') && cellVal2.firstChild?.classList.contains('O') && cellVal3.firstChild?.classList.contains('O')){
            strike.classList.add(strikeCLass);
            statusTxt.style.fontWeight = 'bolder';
            statusTxt.textContent = `Player O wins!..`;
            gif.style.width = '110px';
            allCells.forEach(cell => { cell.removeEventListener('click', cellClicked) })
            return;
        }
        if(cellVal1.firstChild?.classList.contains('X') && cellVal2.firstChild?.classList.contains('X') && cellVal3.firstChild?.classList.contains('X')){
            strike.classList.add(strikeCLass);
            statusTxt.style.fontWeight = 'bolder';
            statusTxt.textContent = `Player X wins!..`;
            gif.style.width = '110px';
            allCells.forEach(cell => { cell.removeEventListener('click', cellClicked) })
            return;
        }
    }
   
    const allFiledCell = [...allCells].every(cell => {
        return cell.firstElementChild?.classList.contains('O') ||
            cell.firstElementChild?.classList.contains('X')
    })
    if(allFiledCell){
        statusTxt.style.fontWeight = 'bolder';
        statusTxt.textContent = `Draw!!..`;
    }
}
