const playerHorizontalSpeed = 0.1 // Հեռավորթյունը որը կարող է անցնել 1 միլիվարկյանում
const gravity = 0.0025 // Հեռավորթյունը որը կարող է անցնել 1 միլիվարկյանում
const spaceBetweenObstacles = 200

document.addEventListener('DOMContentLoaded', (event) => {
    const gameBoard = document.getElementById('game-board')
    const game = new Game(gameBoard, gravity, playerHorizontalSpeed, spaceBetweenObstacles)
    game.start()
})
