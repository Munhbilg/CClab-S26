class Timer{
  constructor(errorse){
    this.errorse = errorse;
    this.started = false;
    this.startframe = 0;
    this.solved = false;
    this.message = "";
    this.showresult = false;
  }

  setup(){
    this.started = false;
    this.startframe = 0;
    this.solved = false;
    this.message = "";
    this.showresult = false;
  }

  draw(){
    background(240);
    this.display();
  }

  display(){
    //box
    stroke(100);
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2, 360, 300, 4);

    //instructions
    noStroke();
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    
    if(!this.started){
      text("Press SPACE to start", width / 2, height / 2 - 30);
      text("Then press SPACE again", width / 2, height / 2);
      text("at exactly 5 seconds", width / 2, height / 2 + 30);
    }
    else if(!this.showresult){
      text("Timer running...", width / 2, height / 2 - 30);
      text("Press SPACE at 5 seconds", width / 2, height / 2 + 30);
    }

    //result
    if(this.showresult){
      textSize(24);
      if(this.solved){
        fill(0, 150, 0);
        text("Perfect!", width / 2, height / 2 - 30);
        fill(0);
        textSize(18);
        text(this.message, width / 2, height / 2 + 30);
      }
      else{
        fill(200, 0, 0);
        text("Wrong", width / 2, height / 2 - 30);
        fill(0);
        textSize(18);
        text(this.message, width / 2, height / 2);
        text("Press SPACE to try again", width / 2, height / 2 + 30);
      }
    }
  }

  keyPressed(){
    if(key === ' '){
      if(!this.started){
        //start
        this.started = true;
        this.startframe = frameCount;
        this.showresult = false;
        this.message = "";
      }
      else if(!this.showresult){
        //check
        this.check();
      }
      else if(!this.solved){
        //retry
        this.reset();
      }
    }
  }

  mousePressed(){
    //same as keyPressed, but for mouse click
    if(!this.started){
      //start
      this.started = true;
      this.startframe = frameCount;
      this.showresult = false;
      this.message = "";
    }
    else if(!this.showresult){
      //check
      this.check();
    }
    else if(!this.solved){
      //retry
      this.reset();
    }
  }

  check(){
    let timer = frameCount - this.startframe;
    let seconds = timer / 60;
    let target = 5.0;
    let diff = abs(seconds - target);

    //result
    this.showresult = true;

    let second = floor(seconds);
    let centisecond = floor((seconds % 1) * 100);
    let time = second + "." + centisecond;

    if(diff <= 0.5){
      this.solved = true;
      this.message = "You waited " + time + " seconds";
    }
    else{
      this.solved = false;
      this.message = "You waited " + time + " seconds";
      if(this.errorse){
        this.errorse.play();
      }
    }
  }

  reset(){
    this.started = false;
    this.startframe = 0;
    this.solved = false;
    this.message = "";
    this.showresult = false;
  }
}