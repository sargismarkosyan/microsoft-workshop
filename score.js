function Score(width) {
    this.width = width
    this.text = ''
}

Score.prototype.setScore = function(score) {
    this.text = 'Score: ' + score
}

Score.prototype.render = function(context) {
    context.font = '24px Consolas'
    context.fillStyle = 'black'
    context.textAlign = 'right'
    context.fillText(this.text, this.width - 10, 20);
}
