document.addEventListener('DOMContentLoaded', (event) => {
    const gameBoard = document.getElementById('game-board')
    startGame(gameBoard)
})

const playerSize = 30

function startGame(board) {
    const context = board.getContext('2d')
    const player = new Player(playerSize)
    player.render(context)
    //@TODO add obsticales
    //@TODO add score counter
}

function Player(size) {
    this.playerSize = size
    this.x = 0
    this.y = 0
}

Player.prototype.render = function(context) {
    context.fillStyle = 'orange';
    context.fillRect(this.x, this.y, this.playerSize, this.playerSize);
}
