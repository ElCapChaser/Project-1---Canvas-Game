class Game {
  constructor() {
    this.player = new Player();
    this.setKeyBindings();
    this.incomingBubbles = [
      new IncomingBubble(0, 0),
      new IncomingBubble(50, 0),
      new IncomingBubble(150, 0),
      new IncomingBubble(150, 50)
    ];
    this.lastBubbleTime = 0;
    this.shotBubbles = [
      new ShotBubble()
    ];
    this.inventory = new Inventory();
  }

  //adding the event listeners once the game is intiated.
  setKeyBindings() {
    //shooting the bullet with mouseclick
    canvasElement.addEventListener('click', (event) => {
      let vx = event.offsetX - (this.player.x + this.player.width/2-2.5);
      let vy = event.offsetY - this.player.y;
      console.log(vx, vy);
      let dist = Math.sqrt(vx * vx + vy * vy);
      let dx = vx / dist;
      let dy = vy / dist;
      console.log(dx, dy);
      this.shootBubble(dx, dy);
    });

    //move player around on the screen
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          break;
      }
    });
  }

  addBubble() {
    const currentTime = Date.now();
      if (currentTime > this.lastBubbleTime + 2000) {
        this.incomingBubbles.push(new IncomingBubble(Math.random() * (canvasElement.width-50), 0));
        this.lastBubbleTime = currentTime;
      }
  }

  checkHit() {
    // check for collision bullet & incoming bubbles
    for (let incomingBubble of this.incomingBubbles) {
      for (let shotBubble of this.shotBubbles) {
        //remove bullets if HIT AND bullet and bubble same color
        if (
          shotBubble.y <= incomingBubble.y + incomingBubble.height &&
          shotBubble.x >= incomingBubble.x &&
          shotBubble.x <= incomingBubble.x + incomingBubble.width &&
          shotBubble.color === incomingBubble.color
        ) {
          const indexIncomingBubble = this.incomingBubbles.indexOf(
            incomingBubble
          );
          const indexShotBubble = this.shotBubbles.indexOf(shotBubble);

          //remove incoming bubbles and shot bullets from screen
          this.shotBubbles.splice(indexShotBubble, 1);
          this.incomingBubbles.splice(indexIncomingBubble, 1);
        }

        //remove bullet once above top canvas
        else if (shotBubble.y < 0) {
          const indexIncomingBubble = this.incomingBubbles.indexOf(
            incomingBubble
          );
          const indexShotBubble = this.shotBubbles.indexOf(shotBubble);
          this.shotBubbles.splice(indexShotBubble, 1);
        }
      }
    }
  }

  shootBubble(dx, dy) {
    const x = this.player.x + this.player.width/2-2.5;
    const y = this.player.y;
    const shotBubble = new ShotBubble(x, y, dx, dy);
    this.shotBubbles.push(shotBubble);
  }

  runLogic() {
    for (let shotBubble of this.shotBubbles) {
      shotBubble.runLogic();
    }
    this.addBubble();
    for (let incomingBubble of this.incomingBubbles) {
      incomingBubble.runLogic()
    }
    this.checkHit();
  }

  draw() {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    this.player.draw();
    for (let bubble of this.incomingBubbles) {
      bubble.draw();
    }
    for (let shotBubble of this.shotBubbles) {
      shotBubble.draw();
    }
  }

  loop() {
    this.runLogic();
    this.draw();
    setTimeout(() => {
      this.loop();
    }, 1000 / 30);
  }
}
