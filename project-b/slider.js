class Slider{
  constructor(){
    this.sliderwidth = 220;
    this.x = 0;
    this.targetx = 0; 
    this.goalx = 0;  
    this.solved = false;
    this.hold = 0;
    this.required = 180;  //frames needed to solve
  }

  setup(){
    let left = width / 2 - this.sliderwidth / 2 + 5;
    this.x = left;
    this.targetx = left;
    this.hold = 0;
    this.solved = false;
  }

  reset(){
    this.setup();
  }

  draw(){
    background(240);
    this.update();
    this.display();
  }

  update(){
    let left = width / 2 - this.sliderwidth / 2 + 5;
    let right = width / 2 + this.sliderwidth / 2 - 5;
    this.targetx = constrain(mouseX, left, right);
    this.x = lerp(this.x, this.targetx, 0.2);
    
    // Update goal position if not solved
    if (!this.solved){
      this.goalx = width / 2 + sin(frameCount * 0.01 - 150) * 100;
    }
    
    //check if on goal
    if (!this.solved){
      if (this.x > this.goalx - 8 && this.x < this.goalx + 8){
        this.hold += 1;
        if (this.hold >= this.required){
          this.solved = true;
        }
      }
      else{
        this.hold = 0;
      }
    }
  }

  display(){
    let cx = width / 2;
    let cy = height / 2;

    //layout
    stroke(100);
    strokeWeight(1);
    fill(255);
    rect(cx, cy, 360, 300, 4);

    //background
    fill(200, 220, 255);
    rect(cx, cy - 20, 240, 80);
    fill(255, 255, 200);
    rect(cx, cy + 30, 240, 40);
    fill(0);
    ellipse(cx + 70, cy, 15, 15);
    rect(cx + 70, cy + 4, 15, 15);

    //animals
    textSize(18);
    text("🐭", this.goalx, cy + 3);
    textSize(28);
    text("🐱", this.x, cy);

    //slider
    stroke(200);
    strokeWeight(20);
    line(cx - this.sliderwidth / 2 + 7, cy + 100, cx + this.sliderwidth / 2 - 7, cy + 100);
    noStroke();
    fill(150);
    ellipse(this.x, cy + 100, 20);

    fill(0);
    textSize(18);
    text("Catch the mouse for 3 seconds", cx, cy - 100);
    textSize(26);
    if (this.solved) {
      text("Verified", cx, height - 40);
    } else if (this.hold > 0) {
      let s = floor((this.required - this.hold) / 60) + 1;
      text("Catching... " + s, cx, height - 40);
    }
  }
}