class ShotBubble {
    constructor(x, y, dx, dy, bulletColor) {
      this.x = x;
      this.y = y;
      this.color = bulletColor;
      this.speedX = dx;
      this.speedY = dy;
      this.width = 5;
    }
  
    runLogic() {
      this.x += this.speedX*10;
      this.y += this.speedY*10;
    }
  
    draw() {
      //to be done dynamically in fillStyle
      context.fillStyle = this.color;
      context.fillRect(
        this.x,
        this.y,
        this.width,
        5
      )
    }
  }