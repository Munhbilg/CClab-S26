class Click{
  constructor(errorse, dogse){
    this.errorse = errorse;
    this.dogse = dogse;
    
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
    this.dogx = width / 2;
    this.dogy = height / 2;
    this.targetx = width / 2;
    this.targety = height / 2;
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
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2, 360, 300, 4);

    //dog
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text("🐶", this.dogx, this.dogy);

    //instructions
    noStroke();
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    if(!this.solved){
      text("Pet the dog " + this.required + " times", width / 2, height / 2 - 120);
      textSize(24);
      text("Pets: " + this.clickcount + "/" + this.required, width / 2, height - 40);
    }
  }

  mousePressed(){
    if(this.solved) return;

    //check if clicked dog
    let d = dist(mouseX, mouseY, this.dogx, this.dogy);
    
    if(d < 25){
      this.clickcount += 1;
      this.lastClickTime = frameCount;
      this.setRandomTarget();
      this.arrived = false;
      if(this.dogse){
        this.dogse.play();
      }

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
    this.dogx = width / 2;
    this.dogy = height / 2;
    this.targetx = width / 2;
    this.targety = height / 2;
    this.clickcount = 0;
    this.solved = false;
    this.lastClickTime = frameCount;
    this.arrived = true;
  }
}