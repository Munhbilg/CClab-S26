//Story section after the captchas are complete
class Story{
  constructor(robot, grantedse, deniedse, video){
    this.robot = robot;
    this.grantedse = grantedse;
    this.deniedse = deniedse;
    this.video = video;
    this.dialogue = [
      "Verification complete.",
      "Input pattern recognized.",
      "Hmm... interesting.",
      "You appear to be human.",
      "Not many reach this point.",
      "You did not stop.",
      "You spent ",
    ];
    this.index = 0;
    this.line = "";
    this.startframe = 0;
    this.waitframe = 180; //frames to wait before next line
    this.running = false;
    this.choosing = false;
    this.ended = false;
    this.choice = 0; //0: none, 1: good, 2: bad
    this.outcome = "";
    this.captchatime = 0;
    this.currentSound = null;
  }

  start(captchatimer){
    this.index = 0;
    this.line = "";
    this.captchatime = captchatimer;
    this.running = true;
    this.choosing = false;
    this.ended = false;
    this.choice = 0;

    this.stopSound();
    this.nextline();
  }

  update() {
    if (this.running){
      if (frameCount - this.startframe > this.waitframe){
        this.nextline();
      }
    }
  }

  nextline(){
    this.stopSound();

    //next line
    if (this.index >= this.dialogue.length){
      this.startchoice();
    } else {
      this.line = this.dialogue[this.index];

      //time spent on captchas
      if (this.index == 6){
        let elapsed = frameCount - this.captchatime;
        let seconds = floor(elapsed / 60);
        let minutes = floor(seconds / 60);
        seconds = seconds % 60;
        this.line += minutes + " minutes and " + seconds + " seconds doing this captcha.";
      }

      if(this.robot[this.index]){
        this.currentSound = this.robot[this.index];
        this.currentSound.play();
      }
      this.index+=1;
      this.startframe = frameCount;
    }
  }

  startchoice(){
    this.stopSound();
    this.running = false;
    this.choosing = true;
    this.line = "But why? why go through all this effort just to see what's inside?";
    
    if(this.robot[7]){
      this.currentSound = this.robot[7];
      this.currentSound.play();
    }
  }

  draw() {
    if (this.running){
      //dialogue
      background(18, 22, 30);
      noStroke();
      //show camera for "You appear to be human"
      if(this.index == 4){
        image(this.video, width / 2, height * 0.45, 640, 480);
      }

      //dialogue
      fill(18, 22, 30);
      rect(width / 2, height * 0.45, width * 0.75, 32);
      fill(226);
      textAlign(CENTER, CENTER);
      textSize(24);
      textLeading(32);
      text(this.line, width / 2, height * 0.45, width * 0.75, 160);

    } else if (this.choosing){
      //show choice
      background(18, 22, 30);
      fill(226);
      textAlign(CENTER, CENTER);
      textSize(24);
      textLeading(32);
      text(this.line, width / 2, height * 0.45 - 90, width * 0.75, 140);
      this.drawchoices();

    } else if (this.ended){
      //show ending
      this.drawending();
    }
  }

  drawchoices(){
    rectMode(CENTER);
    
    //choice 1 box
    stroke(100);
    strokeWeight(1);
    fill(28, 36, 52);
    rect(width / 2, height * 0.48, width * 0.28, 60, 10);
    noStroke();
    fill(210);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("I belong here.", width / 2, height * 0.48);

    //choice 2 box
    stroke(100);
    strokeWeight(1);
    fill(28, 36, 52);
    rect(width / 2, height * 0.48 + 80, width * 0.28, 60, 10);
    noStroke();
    fill(210);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("I was just testing.", width / 2, height * 0.48 + 80);
  }

  //ending screen based on choice
  drawending(){
    if (this.outcome == "granted"){
      //good ending
      background(12, 28, 48);
      fill(190, 230, 255);
      textAlign(CENTER, CENTER);
      textSize(36);
      text("You may now enter.", width / 2, height * 0.45);
      textSize(18);
      fill(170);
      text("The site is open. Welcome inside.", width / 2, height * 0.6);
    }
    else {
      //bad ending
      background(15, 10, 10);
      noStroke();
      fill(255, 80, 80);
      textAlign(CENTER, CENTER);
      textSize(34);
      text("Access denied.", width / 2, height * 0.45);
      textSize(16);
      fill(200, 120, 120);
      text("You have been blocked for suspicious activity.", width / 2, height * 0.6);
    }
  }

  mousePressed(){
    if (this.running){
      this.stopSound();
      this.nextline();
    }
    else if (this.choosing){
      let w = width * 0.28;
      let h = 60;
      let x = width / 2;
      let y0 = height * 0.48;
      let y1 = height * 0.48 + 80;
      
      //choice 1
      if(mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y0 - h / 2 && mouseY < y0 + h / 2){
        this.stopSound();
        this.choice = 1;
        this.outcome = "granted";
        this.choosing = false;
        this.ended = true;
        this.grantedse.play();
      }

      //choice 2
      if (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y1 - h / 2 && mouseY < y1 + h / 2){
        this.stopSound();
        this.choice = 2;
        this.outcome = "denied";
        this.choosing = false;
        this.ended = true;
        this.deniedse.play();
      }
    }
  }

  stopSound(){
    if(this.currentSound && this.currentSound.isPlaying()){
      this.currentSound.stop();
    }
  }
}