class HighSpeedBubble extends IncomingBubble {
    constructor(x, y, speed) {
        super (x, y)
        this.color = 'black'
        this.speed = speed;
    }

    runLogic() {
        this.y +=0.5 * this.speed
    }

    // draw () {
    //     context.fillStyle = this.color
    //     context.fillRect(
    //       this.x,
    //       this.y,
    //       this.width,
    //       this.height
    //     )
    //   }
}