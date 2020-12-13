const playerSize = 30
const obsticaleSpaceMin = playerSize + 25
const obsticaleSpaceMax = playerSize + 75

function Game(board, gravity, horizontalSpeed, spaceBetweenObstacles) {
    this.width = board.width
    this.height = board.height
    this.gravity = gravity
    this.horizontalSpeed = horizontalSpeed
    this.spaceBetweenObstacles = spaceBetweenObstacles
    this.context = board.getContext('2d')
    this.isEnded = false
    this.animationStartTime = 0

    this.score = new Score(this.width)
    this.player = new Player(playerSize, this.height)

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

Game.prototype.end = function() {
    this.isEnded = true
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

        if (obsticale.hasCollision(this.player.x, this.player.y, this.player.size, this.player.size)) {
            this.end()
            return
        }
    })

    this.score.setScore(Math.floor(timestamp / 1000))
    this.score.render(this.context)

    this.animationStartTime = timestamp

    window.requestAnimationFrame(this.step.bind(this))
}
