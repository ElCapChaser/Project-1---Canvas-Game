class ScoreBoard {

    constructor () {
        this.starttime = new Date()
        this.elapsedTime = 0;
    }

    runLogic () {
        this.elapsedTime = Math.round((new Date() - this.starttime) / 1000)
    }

    draw () {
        context.fillStyle = 'black';
        context.font = '16px san-serif'
        context.fillText('Seconds in game: ' + this.elapsedTime, 350, 475);
    }

}
