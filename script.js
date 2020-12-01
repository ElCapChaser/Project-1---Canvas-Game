const canvasElement = document.querySelector('canvas')
const context = canvasElement.getContext('2d')

const inventoryHeight = 50;
const heightExcludingInventory = canvasElement.height - inventoryHeight

//instantiate game class

const triggerStartElement = document.getElementById('trigger-start');
const triggerRestartElement = document.getElementById('trigger-restart');

const screenStartElement = document.getElementById('screen-start')
const screenGameOverElement = document.getElementById('screen-game-over')
const screenPlayElement = document.getElementById('screen-playing')





triggerStartElement.addEventListener('click', () => {
    const game = new Game();
    screenStartElement.style.display = 'none';
    screenPlayElement.style.display = 'initial'
    game.loop();    
})


triggerRestartElement.addEventListener('click', () => {  
    const game = new Game();
    screenGameOverElement.style.display = 'none';
    screenStartElement.style.display = 'none';
    screenPlayElement.style.display = 'initial'
    game.loop();  
})