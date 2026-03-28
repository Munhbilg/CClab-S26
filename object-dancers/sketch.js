/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new RoboDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class RoboDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.color1 = 220;
    this.color2 = 240;
    this.color3 = 180;
    this.color4 = 160;
    this.colorr = 255;
    this.colorb = 0;
    this.colorw = 255;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    noStroke();
    rectMode(CENTER);
    ellipseMode(CENTER);

    let bodymove = map(sin(frameCount * 0.1), -1, 1, -PI/10, PI/10);
    let headmove = sin(frameCount * 0.1) * 5;
    let move = sin(frameCount * 0.2)
    
    //arms
    push()
    translate(0, move-30)
    push();
    translate(-12 + headmove, 13);
    for (let i = 0; i < 4; i++) {
      let angle = map(sin(frameCount * 0.1), -1, 1, -0.4, 0.8);
      rotate(angle+PI/10);
      fill(this.color1);
      rect(0, 10, 10, 15);
      translate(0, 14);
     }
    rotate(PI/10)
    pop();
    push();
    translate(12 + headmove, 13);
    for (let i = 0; i < 4; i++) {
      let angle = map(sin(frameCount * 0.1 + PI), -1, 1, -0.4, 0.8);
      rotate(-angle-PI/10);
      fill(this.color1);
      rect(0, 10, 10, 15);
      translate(0, 14);
     }
    rotate(PI/10)
    pop();
    
    // legs
    push();
    translate(5 - headmove * 2, 70);
    for (let i = 0; i < 2; i++){
      let angle = map(sin(frameCount * 0.1 ), -0, 1, 0, 0.2);
      rotate(-angle);
      fill(this.color1);
      rect(0, 0, 10, 30);
      translate(0, 30);
     }
    pop();
    push();
    translate(-5 - headmove * 2, 70);
    for (let i = 0; i < 2; i++){
      let angle = map(sin(frameCount * 0.1 ), -0, 1, 0, 0.2);
      rotate(-angle);
      fill(this.color1);
      rect(0, 0, 10, 30);
      translate(0, 30);
     }
    pop();
    // body

    push();
    translate(0, 30);
    rotate(bodymove);
    fill(this.color1);
    ellipse(0, 20, 25, 25);

    fill(this.color1);
    rect(0, 0, 25, 40);

    fill(this.color3);
    rect(0, -10, 15, 10);

    pop();
    push();
    translate(headmove, move);
    fill(this.color3);
    ellipse(-20, 0, 15, 15);
    ellipse(20, 0, 15, 15);

    fill(this.color1);
    rect(0, -2.5, 40, 35);
    rect(0, -22, 5, 5);

    fill(255, 0, 0);
    ellipse(0, -28, 10, 10);

    // face
    fill(this.color4);
    ellipse(-9, -3, 16);
    ellipse(9, -3, 16);

    fill(this.colorr);
    ellipse(-9, -3, 12);
    ellipse(9, -3, 12);

    fill(this.colorb);
    rect(-9, -3, 5, 5);
    rect(9, -3, 5, 5);

    fill(this.colorw);
    rect(0, 7, 10, 7);

    fill(this.color3);
    rect(-2, 7, 1, 7);
    rect(2, 7, 1, 7);
    pop();
    pop()
    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    rectMode(CORNER);
    stroke(255, 0, 0);
    //line(-5, 0, 5, 0);
    //line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/