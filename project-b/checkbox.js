class Checkbox{
  constructor(slidesound){
    this.slidesound = slidesound;

    this.boxx = 0;
    this.boxy = 0;
    this.velx = 0;
    this.vely = 0;
    this.accx = 0;
    this.accy = 0;
    this.push = 0.05;
    this.ticked = false;
    this.solved = false;

    //track if mouse is already near
    this.sliding = false;
  }

  setup(){
    rectMode(CENTER);
    this.boxx = width / 2;
    this.boxy = height / 2;
  }

  draw(){
    background(240);
    strokeWeight(1);
    this.update();
    this.display();
  }

  update(){
    let distm = dist(mouseX, mouseY, this.boxx - 150, this.boxy);
    
    if(distm < 60){
      this.accx = (this.boxx - 150 - mouseX) * this.push;
      this.accy = (this.boxy - mouseY) * this.push;
      this.velx += this.accx;
      this.vely += this.accy;

      //play once when entering range
      if(!this.sliding && this.slidesound){
        this.slidesound.play();
      }

      this.sliding = true;

    }else{
      this.sliding = false;
    }

    //motion
    this.velx *= 0.9;
    this.vely *= 0.9;
    this.boxx += this.velx;
    this.boxy += this.vely;
    
    //stay in window
    this.boxx = constrain(this.boxx, 185, width - 185);
    this.boxy = constrain(this.boxy, 55, height - 55);
  }

  display(){
    //layout
    stroke(100);
    fill(255);
    rect(this.boxx, this.boxy, 360, 100, 4);
    rect(this.boxx - 150, this.boxy, 30, 30, 4);

    //checkmark
    if(this.ticked){
      strokeWeight(4);
      line(this.boxx - 158, this.boxy, this.boxx - 152, this.boxy + 7);
      line(this.boxx - 152, this.boxy + 7, this.boxx - 142, this.boxy - 7);
      strokeWeight(1);
      this.solved = true;
    }

    //text
    noStroke();
    fill(0);
    textSize(18);
    textAlign(LEFT, CENTER);
    text("Are you a Robot?", this.boxx - 120, this.boxy);
  }

  mousePressed(){
    let midx = this.boxx - 150;
    let midy = this.boxy;

    if(mouseX > midx - 15 && mouseX < midx + 15 && mouseY > midy - 15 && mouseY < midy + 15){
      this.ticked = !this.ticked;
    }
  }

  reset(){
    this.ticked = false;
    this.solved = false;
    this.sliding = false;
  }
}