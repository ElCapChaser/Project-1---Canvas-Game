class ShotBubble {
    constructor(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.color = [`yellow`, `green`, `red`] [Math.floor(Math.random() * 3)]
      this.speedX = dx;
      this.speedY = dy;
    }
  
    runLogic() {
      this.x += this.speedX*10;
      this.y += this.speedY*10;
    }
  
    draw() {
      //to be done dynamically in fillStyle
      context.fillStyle = this.color
      context.fillRect(
        this.x,
        this.y,
        5,
        5
      )
    }
  }