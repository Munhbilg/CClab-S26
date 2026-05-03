class Timer{
  constructor(errorse, startse){
    this.errorse = errorse;
    this.startse = startse;
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
      text("You have to press the button", width / 2, height / 2 - 20);
      text("exactly at 5 seconds", width / 2, height / 2 + 10);
    }
    else if(!this.showresult){
      text("Timer running...", width / 2, height / 2 - 20);
      text("Press the button at 5 seconds", width / 2, height / 2 + 10);
    }

    //result
    if(this.showresult){
      textSize(24);
      if(this.solved){
        fill(0, 150, 0);
        text("Perfect!", width / 2, height / 2 - 20);
        fill(0);
        textSize(18);
        text(this.message, width / 2, height / 2 + 20);
      }
      else{
        fill(200, 0, 0);
        text("Wrong", width / 2, height / 2 - 20);
        fill(0);
        textSize(18);
        text(this.message, width / 2, height / 2 + 20);
      }
    }

    //button
    noStroke();
    fill(220);
    rect(width / 2, height / 2 + 90, 140, 40, 6);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    if(!this.started){
      text("Start", width / 2, height / 2 + 90);
    }
    else if(!this.showresult){
      text("Check", width / 2, height / 2 + 90);
    }
    else if(!this.solved){
      text("Retry", width / 2, height / 2 + 90);
    }
  }

  keyPressed(){
    if(key === ' '){
      if(!this.started){
        this.started = true;
        this.startframe = frameCount;
        this.showresult = false;
        this.message = "";
        if(this.startse){
          this.startse.stop();
          this.startse.loop();
        }
      }
      else if(!this.showresult){
        this.check();
      }
      else if(this.showresult){
        this.reset();
      }
    }
  }

  mousePressed(){
    if(mouseX > width / 2 - 70 && mouseX < width / 2 + 70 && mouseY > height / 2 + 70 && mouseY < height / 2 + 110){
      if(!this.started){
        this.started = true;
        this.startframe = frameCount;
        this.showresult = false;
        this.message = "";
        if(this.startse){
          this.startse.stop();
          this.startse.loop();
        }
      }
      else if(!this.showresult){
        this.check();
      }
      else if(this.showresult){
        this.reset();
      }
    }
  }

  check(){
    let timer = frameCount - this.startframe;
    let seconds = timer / 60;
    let target = 5.0;
    let diff = abs(seconds - target);

    //result
    this.showresult = true;
    if(this.startse){
      this.startse.stop();
    }
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
    if(this.startse){
      this.startse.stop();
    }
  }
}