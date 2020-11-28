class Inventory {
  constructor() {
    this.inventory = () => {    
        for (let i = 0; i < 20; i++) {
         let generateBubble = new ShotBubble(x + 30 * i, y, 0, 0)
         console.log(generateBubble)
         this.inventory.push(generateBubble);
         }
    }
  }

  draw() {
    //
  }

}
