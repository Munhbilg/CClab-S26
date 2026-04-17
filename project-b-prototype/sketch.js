let captchas = [];
let current = 0;
let rotateimg;

function preload() {
  rotateimg = loadImage("assets/rotate.png");
  sliderimg = loadImage("assets/slider.png");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  let checkbox = new Checkbox();
  let rotate = new Rotate(rotateimg);
  let slider = new Slider(sliderimg);
  captchas.push(checkbox);
  captchas.push(rotate);
  captchas.push(slider);
  checkbox.setup();
  rotate.setup();
  slider.setup();
}

function draw() {
  captchas[current].draw();

  if (captchas[current].solved) {
    nextCaptcha();
  }
}

function mousePressed() {
  if (captchas[current] && captchas[current].mousePressed) {
    captchas[current].mousePressed();
  }
}

function nextCaptcha() {
  if (captchas[current] && captchas[current].hideButtons) {
    captchas[current].hideButtons();
  }

  current = (current + 1) % captchas.length;
  captchas[current].reset();
  captchas[current].setup();
  if (captchas[current] && captchas[current].showButtons) {
    captchas[current].showButtons();
  }
}

function keyPressed() {
  if (key === 's') {
    console.log("Skipping");
    nextCaptcha();
  }
}

