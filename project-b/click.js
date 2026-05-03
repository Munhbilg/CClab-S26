class Click{
  constructor(errorse, correctse){
    this.errorse = errorse;
    
    this.dogx = 0;
    this.dogy = 0;
    this.targetx = 0;
    this.targety = 0;
    this.clickcount = 0;
    this.required = 10;
    this.solved = false;
    this.lastClickTime = 0;
    this.arrived = true;
  }

  setup(){
    this.setRandomTarget();
    this.dogx = this.targetx;
    this.dogy = this.targety;
    this.clickcount = 0;
    this.solved = false;
    this.lastClickTime = frameCount;
    this.arrived = true;
  }

  draw(){
    background(240);
    this.update();
    this.display();
  }

  update(){
    this.dogx = lerp(this.dogx, this.targetx, 0.1);
    this.dogy = lerp(this.dogy, this.targety, 0.1);
    if(dist(this.dogx, this.dogy, this.targetx, this.targety) < 5){
      this.arrived = true;
    }

    //if no click for 1 second, move to new random position
    if(this.arrived == true && frameCount - this.lastClickTime > 60){
      this.setRandomTarget();
      this.arrived = false;
    }
  }

  display(){
    //box
    stroke(100);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2, 360, 360, 4);

    //dog
    noStroke();
    textSize(80);
    textAlign(CENTER, CENTER);
    text("🐕", this.dogx, this.dogy);

    //instructions
    noStroke();
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    if(this.solved){
      text("Good job!", width / 2, height / 2 - 140);
      textSize(24);
      text("Verified", width / 2, height - 40);
    }
    else{
      text("Pet the dog " + this.required + " times", width / 2, height / 2 - 140);
      textSize(24);
      text("Pets: " + this.clickcount + "/" + this.required, width / 2, height - 40);
    }
  }

  mousePressed(){
    if(this.solved) return;

    //check if clicked dog
    let d = dist(mouseX, mouseY, this.dogx, this.dogy);
    
    if(d < 50){
      this.clickcount += 1;
      this.lastClickTime = frameCount;
      this.setRandomTarget();
      this.arrived = false;

      //success at 10 clicks
      if(this.clickcount >= this.required){
        this.solved = true;
      }
    }
  }

  setRandomTarget(){
    this.targetx = random(50, width - 50);
    this.targety = random(50, height - 50);
  }

  reset(){
    this.setRandomTarget();
    this.dogx = this.targetx;
    this.dogy = this.targety;
    this.clickcount = 0;
    this.solved = false;
    this.lastClickTime = frameCount;
    this.arrived = true;
  }
}