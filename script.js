// class Game {
//     constructor(canvas) {
//       this.canvas = canvas;
//       this.context = canvas.getContext('2d');
//     }
//     runLogic() {
//       }
// }

//     draw() {
//         context.fillStyle = 'red';
//         context.fillRect(
//             this.x,
//             this.y,
//             this.width,
//             5}
// };

const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

context.fillRect(0, 0, 20, 20);

class Bubble {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

class ShootBubble extends Bubble {
  constructor(x, y, radius, color) {
    super(x, y, radius, color);
  }
}

// const yellowBubble = new ShootBubble(50, 150, 10, 'yellowgreen')
// yellowBubble.draw()
// yellowBubble.runLogic()

// // script
// const greenBubble = new Bubble(50, 150, 10, 'yellowgreen');
// greenBubble.draw();

//game initiation
colorArray = ['yellow', 'green', 'red'];

const canvasWidth = canvasElement.width;
const canvasHeight = canvasElement.height;
for (let i = 0; i < canvasHeight / 2; i += 22) {
  randomInt = Math.floor(Math.random() * 3);
  for (let x = 0; x < canvasWidth; x += 22) {
    const greenBubble = new Bubble(x, i, 10, colorArray[randomInt]);
    greenBubble.draw();
  }
}

let randomInt2 = Math.floor(Math.random() * 3);
const shooterBubble = new ShootBubble((canvasElement.width)/2, canvasElement.height-15, 10, colorArray[randomInt2]);
shooterBubble.draw();
  

//mouse click x & y position

function printMousePos(event) {
    console.log(event.clientX, event.clientY)
}

window.addEventListener('click', printMousePos);
let greenBubble = new Bubble(50, 150, 10, 'yellowgreen');
// setInterval(() => {

//     greenBubble.y -= 15
//     greenBubble.draw()
// },500)
