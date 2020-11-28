
class IncomingBubble {
    constructor (x, y) {
      this.x = x;
      this.y = y;
      this.width = 25
      this.height = 25
      this.color = [`yellow`, `green`, `red`, 'purple'] [Math.floor(Math.random() * 4)]
      this.speed = Math.random()
    }
  
    draw () {
      context.fillStyle = this.color
      context.fillRect(
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
  
    runLogic() {
      this.y +=0.5 * this.speed*4;
    }
  }