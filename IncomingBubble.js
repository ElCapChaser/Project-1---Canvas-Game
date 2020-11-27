
class IncomingBubble {
    constructor (x, y) {
      this.x = x;
      this.y = y;
      this.width = 25
      this.height = 25
      this.color = [`yellow`, `green`, `red`] [Math.floor(Math.random() * 3)]
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
      //walking the bubbles closer to the player
      //to fix that this is conditional. Only run if...
      //this.y +=0.5;
    }
  }