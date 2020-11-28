class Player {
    constructor () {
      this.x = (canvasElement.width-50)/2;
      this.y = heightExcludingInventory-50;
      this.width = 50
    }
  
  // runLogic(){
  //   this.x*= (Math.random() - 0.5) * 2
  
  // }
  
    draw() {
      context.fillStyle = 'blue'
      context.fillRect(
        this.x,
        this.y,
        this.width,
        50
      )
    }
  }
  