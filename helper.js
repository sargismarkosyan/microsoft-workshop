function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function hasCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    const isCollisionX = (x1 < x2 && x1 + w1 > x2) || (x1 > x2 && x1 < x2 + w2)
    const isCollisionY = (y1 < y2 && y1 + h1 > y2) || (y1 > y2 && y1 < y2 + h2)
    return isCollisionX && isCollisionY
}
