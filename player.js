const playerStartingX = 20
const boostImpuls = 1

function Player(size, height) {
    this.size = size
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
    this.y = Math.max(0, Math.min(this.height - this.size, this.y + this.impuls))
    if (this.y === 0) {
        this.impuls = 0
    }
}

Player.prototype.render = function(context) {
    context.fillStyle = 'orange'
    context.fillRect(this.x, this.y, this.size, this.size)
}
