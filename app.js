const playerSize = 30
const obsticaleSpaceMin = playerSize + 25
const obsticaleSpaceMax = playerSize + 75
const playerHorizontalSpeed = 0.1 // Հեռավորթյունը որը կարող է անցնել 1 միլիվարկյանում
const gravity = 0.0025 // Հեռավորթյունը որը կարող է անցնել 1 միլիվարկյանում
const spaceBetweenObstacles = 150
const obstacleWidth = 15
const playerStartingX = 20
const boostImpuls = 1

document.addEventListener('DOMContentLoaded', (event) => {
    const gameBoard = document.getElementById('game-board')
    const game = new Game(gameBoard, gravity, playerHorizontalSpeed, spaceBetweenObstacles)
    game.start()
})

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Game(board, gravity, horizontalSpeed, spaceBetweenObstacles) {
    this.width = board.width
    this.height = board.height
    this.gravity = gravity
    this.horizontalSpeed = horizontalSpeed
    this.spaceBetweenObstacles = spaceBetweenObstacles
    this.context = board.getContext('2d')
    this.player = new Player(playerSize, this.height)
    this.isEnded = false
    this.animationStartTime = 0

    this.obsticales = []
    for (let i = 0; i < this.width; i += spaceBetweenObstacles) {
        const obsticale = new Obsticale(this.height, obsticaleSpaceMin, obsticaleSpaceMax)
        obsticale.setX(this.width + i)
        this.obsticales.push(obsticale)
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            this.player.boostUp()
        }
    });
}

Game.prototype.start = function() {
    window.requestAnimationFrame(this.step.bind(this))
}

Game.prototype.getFearestObstacle = function() {
    return Math.max(...this.obsticales.map((obsticale) => obsticale.x))
}

Game.prototype.step = function(timestamp) {
    if (this.isEnded) {
        return
    }

    if (!this.animationStartTime) {
        this.animationStartTime = timestamp
    }

    this.context.clearRect(0, 0, this.width, this.height);

    const playerDisatance = this.gravity * (timestamp - this.animationStartTime)
    this.player.addImpuls(playerDisatance)
    this.player.updateCords()
    this.player.render(this.context)

    const obsticaleDisatance = this.horizontalSpeed * (timestamp - this.animationStartTime)
    this.obsticales.forEach((obsticale) => {
        if (obsticale.x + obstacleWidth < obsticaleDisatance) {
            obsticale.setX(this.getFearestObstacle() + this.spaceBetweenObstacles)
        } else {
            obsticale.moveLeft(obsticaleDisatance)
        }
        obsticale.render(this.context)
    })

    this.animationStartTime = timestamp

    window.requestAnimationFrame(this.step.bind(this))
}

function Player(size, height) {
    this.playerSize = size
    this.x = playerStartingX
    this.y = 0
    this.height = height
    this.impuls = 0
}

Player.prototype.boostUp = function() {
    this.impuls = Math.min(0, this.impuls) - boostImpuls
}

Player.prototype.addImpuls = function(change) {
    this.impuls += change
}

Player.prototype.updateCords = function(change) {
    this.y = Math.max(0, Math.min(this.height - this.playerSize, this.y + this.impuls))
    if (this.y === 0) {
        this.impuls = 0
    }
}

Player.prototype.render = function(context) {
    context.fillStyle = 'orange';
    context.fillRect(this.x, this.y, this.playerSize, this.playerSize);
}

function Obsticale(height, minSpace, maxSpace) {
    this.x = 0
    this.height = height

    const space = getRandomArbitrary(minSpace, maxSpace)
    this.spaceYTop = getRandomArbitrary(0, height - space)
    this.spaceYBottom = this.spaceYTop + space
}

Obsticale.prototype.setX = function(x) {
    this.x = x
}

Obsticale.prototype.moveLeft = function(distance) {
    this.x -= distance
}

Obsticale.prototype.render = function(context) {
    context.fillStyle = 'green';
    context.fillRect(this.x, 0, obstacleWidth, this.spaceYTop);
    context.fillRect(this.x, this.spaceYBottom, obstacleWidth, this.height);
}
