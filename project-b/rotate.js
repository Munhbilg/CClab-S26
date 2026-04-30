class Rotate{
  constructor(img){
    this.img = img; 
    this.angle = 0;
    this.correctangle = 0;
    this.solved = false;
    this.message = "";
    this.vel = 0;
    this.targetspeed = 0;
  }

  draw(){
    background(240);
    strokeWeight(1);
    
    //rotate image
    if (!this.solved){
      this.vel = lerp(this.vel, this.targetspeed, 0.1);
      this.angle += this.vel;
    }

    this.display();
  }

  setup(){
    imageMode(CENTER);
    rectMode(CENTER);
    this.angle = random(0, 360);
    this.solved = false;
    this.message = "";
    this.vel = 0;
    this.targetspeed = 0;
    this.createButtons();
    this.hideButtons();
  }

  //create and setup buttons
  createButtons(){
    this.leftbutton = createButton("⟲");
    this.rightbutton = createButton("⟳");
    this.checkbutton = createButton("Check");
    
    this.leftbutton.position(width / 2 + 55, height / 2 + 120);
    this.checkbutton.position(width / 2 - 25, height / 2 + 120);
    this.rightbutton.position(width / 2 - 80, height / 2 + 120);
    
    this.leftbutton.mouseClicked(() => {
      if (!this.solved){
        this.targetspeed = -1.5;
      }
    });
    
    this.rightbutton.mouseClicked(() => {
      if (!this.solved){
        this.targetspeed = 1.5;
      }
    });
    
    this.checkbutton.mouseClicked(() => {
      this.check();
    });
  }

  showButtons(){
    if (this.leftbutton){
      this.leftbutton.show();
      this.rightbutton.show();
      this.checkbutton.show();
    }
  }

  hideButtons(){
    if (this.leftbutton){
      this.leftbutton.hide();
      this.rightbutton.hide();
      this.checkbutton.hide();
    }
  }

  display(){
    stroke(100);
    fill(255);
    rect(width / 2, height / 2, 360, 360, 4);
    noStroke();
    fill(100);
    ellipse(width / 2, height / 2, 182, 182);

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
    text("Rotate the image upright", width / 2, height / 2 - 120);

    //status
    textSize(27);
    if (this.solved){
      text("Verified", width / 2, height - 40);
    } 
    else if (this.message !== ""){
      text(this.message, width / 2, height - 40);
    }
  }

  //check if image is correctly rotated
  check(){
    let correct = this.angle % 360;
    if (correct < 0){
      correct += 360;
    }
    let diff = abs(correct - this.correctangle);
    if (diff > 180){
      diff = 360 - diff;
    }

    //verify within range
    if (diff < 6){
      this.solved = true;
      this.message = "";
      this.targetspeed = 0;
    }
    else{
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