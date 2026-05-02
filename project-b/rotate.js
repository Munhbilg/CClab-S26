class Rotate{
  constructor(img) {
    this.img = img; 
    this.angle = 0;
    this.correctangle = 0;
    this.solved = false;
    this.message = "";
    this.vel = 0;
    this.targetspeed = 0;
  }

  setup(){
    imageMode(CENTER);
    rectMode(CENTER);
    this.angle = random(0, 360);
    this.solved = false;
    this.message = "";
    this.vel = 0;
    this.targetspeed = 0;
  }
  draw() {
    background(240);
    if (!this.solved){
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
    rect(width/2 - 100, height/2 + 130, 60, 40, 5);
    rect(width/2 + 100, height/2 + 130, 60, 40, 5);
    rect(width/2, height/2 + 130, 100, 40, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("⟲", width/2 - 100, height/2 + 130);
    text("⟳", width/2 + 100, height/2 + 130);
    text("Check", width/2, height/2 + 130);

    //image
    push();
    translate(width / 2, height / 2);
    rotate(radians(this.angle));
    image(this.img, 0, 0, 180, 180);
    pop();

    //instructions
    fill(0);
    textSize(18);
    textAlign(CENTER);
    text("Rotate the image upright", width / 2, height / 2 - 140);

    //status
    textSize(24);
    if (this.solved) {
      text("Verified", width / 2, height - 40);
    } else if (this.message !== "") {
      text(this.message, width / 2, height - 40);
    }
  }

  mousePressed(){
    let lx = width/2 - 100;
    let rx = width/2 + 100;
    let cx = width/2;
    let y = height/2 + 130;

    if (!this.solved) {
      if (dist(mouseX, mouseY, lx, y) < 40) {
        this.targetspeed = -1.5;
      }
      else if (dist(mouseX, mouseY, rx, y) < 40) {
        this.targetspeed = 1.5;
      }
      else if (dist(mouseX, mouseY, cx, y) < 50) {
        this.check();
      }
    }
  }

  check(){
    let correct = this.angle % 360;
    if (correct < 0){
      correct += 360;
    }
    let diff = abs(correct - this.correctangle);
    if (diff > 180){
      diff = 360 - diff;
    }
    if (diff < 6){
      this.solved = true;
      this.message = "";
      this.targetspeed = 0;
    }
    else {
      this.message = "Wrong. Try again";
      this.angle = random(0, 360);
      this.targetspeed = 0;
    }
  }

  reset(){
    this.solved = false;
    this.angle = random(0, 360);
    this.targetspeed = 0;
    this.message = "";
  }
}