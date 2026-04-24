
class Slider{
  constructor(image) {
    this.image = image;
    this.sliderwidth = 200;
    this.x = 0;
    this.targetx = 0;
    this.goalx = 0;
    this.solved = false;
    this.message = "";
  }

  setup() {
    let leftedge = width / 2 - this.sliderwidth / 2;
    this.x = leftedge;
    this.targetx = leftedge;
    this.goalx = leftedge + random(0.2, 0.9) * this.sliderwidth;
    this.solved = false;
    this.message = "";
    this.createButton();
    this.hideButtons();
  }

  draw() {
    background(240);
    strokeWeight(1);
    this.update();
    this.display();
  }

  createButton() {
    if (this.checkbutton) return;
    this.checkbutton = createButton("Check");
    this.checkbutton.position(width/2 - 25, height/2 + 120);
    this.checkbutton.mouseClicked(() => { 
      this.check();
    });
  }

  showButtons() {
    if (this.checkbutton) {
      this.checkbutton.show();
    }
  }

  hideButtons() {
    if (this.checkbutton) {
      this.checkbutton.hide();
    }
  }

  update() {
    this.x = lerp(this.x, this.targetx, 0.2);
  }

  display() {
    let leftedge = width / 2 - this.sliderwidth / 2;
    let rightedge = width / 2 + this.sliderwidth / 2;
    let slidery = height / 2 + 90;
    let imagey = height / 2 - 20;

    stroke(100);
    strokeWeight(1);
    fill(255);
    rect(width/2, height/2, 360, 360);
    rect(width/2, imagey, this.sliderwidth+21, 141);
    image(this.image, width/2, imagey, this.sliderwidth+20, 140);

    noStroke();
    fill(255);
    rect(this.goalx, imagey, 14, 14, 3);
    fill(255);
    stroke(100);
    rect(this.x, imagey, 14, 14, 3);
    stroke(200);
    strokeWeight(20);
    line(leftedge, slidery, rightedge, slidery);
    noStroke();
    fill(150);
    ellipse(this.x, slidery, 20);

    fill(0);
    textAlign(CENTER);
    textSize(18);
    text("Drag to verify", width/2, height/2 - 120);

    textSize(27);
    if (this.solved) {
      text("Verified", width/2, height - 40);
    } else if (this.message) {
      text(this.message, width/2, height - 40);
    }
  }

  mousePressed(){
    let leftedge = width / 2 - this.sliderwidth / 2;
    let rightedge = width / 2 + this.sliderwidth / 2;
    this.targetx = constrain(mouseX, leftedge, rightedge);
  }

  check() {
    if (-5 < this.x - this.goalx && this.x - this.goalx < 5) {
      this.solved = true;
      this.message = "";
    } else {
      this.message = "wrong. try again";
      this.targetx = width / 2 - this.sliderwidth / 2;
    }
  }

  reset() {
    this.setup();
  }
}