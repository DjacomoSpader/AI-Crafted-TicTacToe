
document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game');
    const restartButton = document.getElementById('restart');
    const winnerDisplay = document.getElementById('winner');
    const scoreDisplay = document.getElementById('score');
    const winSound = new Audio('victory_sound.mp3');
    let currentPlayer = 'X';
    let winner = null;
    let score = { X: 0, O: 0 };
    
    function createBoard() {
        game.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.cellIndex = i;
            game.appendChild(cell);

            cell.addEventListener('click', cellClick, { once: true });
        }
    }

    function cellClick(e) {
        const cell = e.target;
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            winner = currentPlayer;
            winnerDisplay.textContent = 'Vencedor: ' + winner;
            score[winner]++;
            updateScore();
            winSound.play();
            game.childNodes.forEach(cell => cell.removeEventListener('click', cellClick));
        } else if ([...game.childNodes].every(cell => cell.textContent)) {
            winnerDisplay.textContent = 'Vencedor: Empate';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(condition => {
            return condition.every(index => {
                return game.childNodes[index].textContent === player;
            });
        });
    }

    function updateScore() {
        scoreDisplay.textContent = 'X: ' + score.X + ' | O: ' + score.O;
    }

    restartButton.addEventListener('click', () => {
        createBoard();
        currentPlayer = 'X';
        winner = null;
        winnerDisplay.textContent = 'Vencedor: Nenhum';
    });

    // Botão de modo escuro
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    toggleDarkModeButton.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
toggleDarkModeButton.innerHTML = isDarkMode ? '&#x1F31E;' : '&#x1F311;';
        document.querySelector('.game-container').classList.toggle('dark-mode');
    });

    createBoard();
});
