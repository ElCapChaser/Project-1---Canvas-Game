class ScoreBoard {
  constructor() {
    this.starttime = new Date();
    this.elapsedTime = 0;
    this.lostTimeBubble = 0;
    this.LostTimeBullet = 0;
    this.active = true;
    this.totalSecondSurvived = 0;
  }

  runLogic() {
    this.totalSecondSurvived = Math.round((new Date() - this.starttime) / 1000);
    this.elapsedTime = this.totalSecondSurvived - (this.lostTimeBubble + this.LostTimeBullet)
    if (this.elapsedTime >= 100) 
     { this.elapsedTime = 100}
    else if (this.elapsedTime < 0) {
      this.youLose();
    }
  }

  youLose() {
    this.active = false;
  }

  draw() {
    context.fillStyle = 'black';
    context.font = '14px san-serif';
    context.fillText('Health percentage: ' + this.elapsedTime + ' %', 350, 475);
  }
}
