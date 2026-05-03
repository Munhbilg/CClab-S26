class Rotate{
  constructor(img, rotate1, rotate2, wrong){
    this.img = img;
    this.rotate1 = rotate1;
    this.rotate2 = rotate2;
    this.wrong = wrong;

    this.angle = 0;
    this.correctangle = 0;
    this.solved = false;
    this.message = "";
    this.vel = 0;
    this.targetspeed = 0;
    this.currentsound = 0; // 0 none, 1 left, 2 right
  }

  setup(){
    imageMode(CENTER);
    rectMode(CENTER);
    this.angle = random(0, 360);
    this.solved = false;
    this.message = "";
    this.vel = 0;
    this.targetspeed = 0;
    this.currentsound = 0;
  }

  draw(){
    background(240);

    if(!this.solved){
      this.vel = lerp(this.vel, this.targetspeed, 0.1);
      this.angle += this.vel;
    }

    this.display();
  }

  display(){
    stroke(100);
    fill(255);
    rect(width / 2, height / 2, 360, 360, 4);

    //buttons
    noStroke();
    fill(220);
    rect(width/2 - 80, height/2 + 130, 45, 30, 5);
    rect(width/2 + 80, height/2 + 130, 45, 30, 5);
    rect(width/2, height/2 + 130, 60, 30, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("⟲", width/2 - 80, height/2 + 130);
    text("⟳", width/2 + 80, height/2 + 130);
    textSize(14);
    text("Check", width/2, height/2 + 130);

    //image
    push();
    translate(width / 2, height / 2);
    rotate(radians(this.angle));
    image(this.img, 0, 0, 180, 180);
    pop();

    //instructions
    noStroke();
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Rotate the image upright", width / 2, height / 2 - 120);

    //status
    textSize(24);
    if(this.solved){
      text("Verified", width / 2, height / 2 + 160);
    } 
    else if(this.message !== ""){
      text(this.message, width / 2, height / 2 + 160);
    }
  }

  mousePressed(){
    let lx = width/2 - 80;
    let rx = width/2 + 80;
    let cx = width/2;
    let y = height/2 + 130;

    if(!this.solved){

      //left
      if(dist(mouseX, mouseY, lx, y) < 40){
        this.targetspeed = -1.5;

        if(this.currentsound !== 1){
          if(this.rotate2) this.rotate2.stop();
          if(this.rotate1) this.rotate1.loop();
          this.currentsound = 1;
        }
      }

      //right
      else if(dist(mouseX, mouseY, rx, y) < 40){
        this.targetspeed = 1.5;

        if(this.currentsound !== 2){
          if(this.rotate1) this.rotate1.stop();
          if(this.rotate2) this.rotate2.loop();
          this.currentsound = 2;
        }
      }

      //check
      else if(dist(mouseX, mouseY, cx, y) < 50){
        this.stopsound();
        this.check();
      }
    }
  }

  stopsound(){
    if(this.rotate1) this.rotate1.stop();
    if(this.rotate2) this.rotate2.stop();
    this.currentsound = 0;
  }

  check(){
    this.stopsound();
    let correct = this.angle % 360;
    if(correct < 0){
      correct += 360;
    }

    let diff = abs(correct - this.correctangle);
    if(diff > 180){
      diff = 360 - diff;
    }

    if(diff < 6){
      this.solved = true;
      this.message = "";
      this.targetspeed = 0;
    }
    else{
      this.message = "Wrong. Try again";
      this.angle = random(0, 360);
      this.targetspeed = 0;
      this.wrong.play();
    }
  }

  reset(){
    this.solved = false;
    this.angle = random(0, 360);
    this.targetspeed = 0;
    this.message = "";
    this.currentsound = 0;
    this.stopsound();
  }
}