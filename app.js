document.addEventListener('DOMContentLoaded', (event) => {
    const gameBoard = document.getElementById('game-board')
    startGame(gameBoard)
})

const playerSize = 30
const obsticaleSpaceMin = playerSize + 25
const obsticaleSpaceMax = playerSize + 75

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function startGame(board) {
    const height = board.height
    const context = board.getContext('2d')
    const player = new Player(playerSize)
    player.render(context)

    const obsticale = new Obsticale(height, obsticaleSpaceMin, obsticaleSpaceMax)
    obsticale.render(context)
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

function Obsticale(height, minSpace, maxSpace) {
    this.x = 100
    this.height = height

    const space = getRandomArbitrary(minSpace, maxSpace)
    this.spaceYTop = getRandomArbitrary(0, height - space)
    this.spaceYBottom = this.spaceYTop + space
}

Obsticale.prototype.render = function(context) {
    context.fillStyle = 'green';
    context.fillRect(this.x, 0, 15, this.spaceYTop);
    context.fillRect(this.x, this.spaceYBottom, 15, this.height);
}
