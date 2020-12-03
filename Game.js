const hitSound = new Audio('sounds/391658__jeckkech__collision.wav')
const asteroidHitSound = new Audio('sounds/Explosion+1.wav')
const destroyAll = new Audio('sounds/331156__robinhood76__06167-magnetic-destroy-shot.wav')

class Game {
  constructor() {
    this.player = new Player();
    this.setKeyBindings();
    this.incomingBubbles = [];
    this.highSpeedBubbles = [];
    this.lastBubbleTime = 0;
    this.shotBubbles = [];
    this.colorOptions = ['red', 'yellow', 'green', 'purple'];
    this.colorOptionsIndex = 0;
    this.clearScreenCounter = 0;
    this.score = new ScoreBoard(0);
  }

  //adding the event listeners once the game is intiated.
  setKeyBindings() {
    //shooting the bullet with mouseclick
    canvasElement.addEventListener('click', (event) => {
      let vx = event.offsetX - (this.player.x + this.player.width / 2 - 2.5);
      let vy = event.offsetY - this.player.y;
      let dist = Math.sqrt(vx * vx + vy * vy);
      let dx = vx / dist;
      let dy = vy / dist;
      this.shootBubble(dx, dy, this.colorOptions, this.colorOptionsIndex);
    });

    //shift bullet color with right mousclick
    canvasElement.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      let addValue = 1;
      this.colorOptionsIndex += addValue;
      if (this.colorOptionsIndex >= 4) {
        this.colorOptionsIndex = 0;
      }
    });

    //move player around on the screen and super clearer
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.key) {
        case 'ArrowLeft':
          if (this.player.x >= 10) {
            this.player.x -= 10;
          } else this.player.x = canvasElement.width - this.player.width;
          break;
        case 'ArrowRight':
          if (this.player.x < canvasElement.width - this.player.width) {
            this.player.x += 10;
          } else this.player.x = 0;
          break;
        case ' ':
          if (this.clearScreenCounter < 3) {
            destroyAll.play()
            this.incomingBubbles = [];
            this.highSpeedBubbles = [];
            this.clearScreenCounter += 1;
          }
      }
    });
  }

  addBubble() {
    const currentTime = Date.now();
    if (currentTime > this.lastBubbleTime + 2000) {
      this.incomingBubbles.push(
        new IncomingBubble(Math.random() * (canvasElement.width - 50), 0)
      );
      this.lastBubbleTime = currentTime;
    }
  }

  addHighSpeedBubble() {
    if (Math.random() < 0.01) {
      this.highSpeedBubbles.push(
        new HighSpeedBubble(
          Math.random() * (canvasElement.width - 50),
          0,
          Math.random() * 50
        )
      );
    }
  }

  checkHit() {
    // check for collision bullet & incoming bubbles
    for (let incomingBubble of this.incomingBubbles) {
      for (let shotBubble of this.shotBubbles) {
        //remove bullets if HIT AND bullet and bubble same color
        if (
          shotBubble.y <= incomingBubble.y + incomingBubble.height &&
          shotBubble.y >= incomingBubble.y &&
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
          hitSound.play()

        }
      }
    }
  }

  checkHighSpeedCollision() {
    for (let highSpeed of this.highSpeedBubbles) {
      if (
        this.player.x + this.player.width >= highSpeed.x &&
        this.player.x < highSpeed.x + highSpeed.width &&
        this.player.y < highSpeed.y + highSpeed.height
      ) {
        asteroidHitSound.play()
        this.score.youLose();
      }
    }
  }

  checkIncomingBubbleCollision() {
    for (let incomingBubble of this.incomingBubbles) {
      if (
        this.player.x + this.player.width >= incomingBubble.x &&
        this.player.x < incomingBubble.x + incomingBubble.width &&
        this.player.y < incomingBubble.y + incomingBubble.height
      ) {
        console.log((this.score.lostTimeBubble += 10));
        this.incomingBubbles.splice(
          this.incomingBubbles.indexOf(incomingBubble),
          1
        );
        hitSound.play()
      }
    }
  }

  shootBubble(dx, dy) {
    const x = this.player.x + this.player.width / 2 - 2.5;
    const y = this.player.y;
    const bulletColor = this.colorOptions[this.colorOptionsIndex];
    const shotBubble = new ShotBubble(x, y, dx, dy, bulletColor);
    this.shotBubbles.push(shotBubble);
  }

  collectGarbage() {
    //remove bubble once below player and above inventory
    for (let bubble of this.incomingBubbles) {
      if (bubble.y + bubble.height > heightExcludingInventory) {
        this.score.lostTimeBubble += 10;
        this.incomingBubbles.splice(this.incomingBubbles.indexOf(bubble), 1);
      }
    }
    //remove bullet once above top canvas
    for (let shotBubble of this.shotBubbles) {
      if (shotBubble.y < 0) {
        const indexShotBubble = this.shotBubbles.indexOf(shotBubble);
        this.shotBubbles.splice(indexShotBubble, 1);
      }
    }
    //remove high speed
    for (let bubble of this.highSpeedBubbles) {
      if (bubble.y + bubble.height > heightExcludingInventory) {
        const indexBubble = this.highSpeedBubbles.indexOf(bubble);
        this.highSpeedBubbles.splice(indexBubble, 1);
      }
    }
  }

  runLogic() {
    this.score.runLogic();
    for (let shotBubble of this.shotBubbles) {
      shotBubble.runLogic();
    }
    this.addBubble();
    for (let incomingBubble of this.incomingBubbles) {
      incomingBubble.runLogic();
    }
    this.addHighSpeedBubble();
    for (let incomingBubble of this.highSpeedBubbles) {
      incomingBubble.runLogic();
    }
    this.checkHit();
    this.checkHighSpeedCollision();
    this.checkIncomingBubbleCollision();
    this.collectGarbage();
  }

  draw() {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    this.player.draw();
    for (let bubble of this.incomingBubbles) {
      bubble.draw();
    }
    for (let bubble of this.highSpeedBubbles) {
      bubble.draw();
    }
    for (let shotBubble of this.shotBubbles) {
      shotBubble.draw();
    }
    context.fillStyle = this.colorOptions[this.colorOptionsIndex];
    context.fillRect(160, 455, 25, 25);
    this.score.draw();
    context.fillText('Kill all left: ' + (3-this.clearScreenCounter) + ' / 3', 40, 475);
  }

  loop() {
    this.runLogic();
    this.draw();
    if (this.score.active) {
      setTimeout(() => {
        this.loop();
      }, 1000 / 30);
    } else {
      screenPlayElement.style.display = 'none'
      screenGameOverElement.style.display = 'initial'
      document.getElementById('final-score').innerHTML = 'Oh no... you lost! You survived: ' + this.score.totalSecondSurvived + ' seconds'
    }
  }
}
