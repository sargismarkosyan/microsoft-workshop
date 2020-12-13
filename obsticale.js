const obstacleWidth = 15

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

Obsticale.prototype.hasCollision = function(x, y, width, height) {
    const topPart = hasCollision(x, y, width, height, this.x, 0, obstacleWidth, this.spaceYTop)
    const bottomPart = hasCollision(x, y, width, height, this.x, this.spaceYBottom, obstacleWidth, this.height - this.spaceYBottom)
    return topPart || bottomPart
}

Obsticale.prototype.render = function(context) {
    context.fillStyle = 'green';
    context.fillRect(this.x, 0, obstacleWidth, this.spaceYTop);
    context.fillRect(this.x, this.spaceYBottom, obstacleWidth, this.height);
}
