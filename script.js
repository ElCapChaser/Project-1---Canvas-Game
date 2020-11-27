const canvasElement = document.querySelector('canvas')
const context = canvasElement.getContext('2d')

const inventoryHeight = 50;
const heightExcludingInventory = canvasElement.height - inventoryHeight

//instantiate game class
const game = new Game();
game.loop();