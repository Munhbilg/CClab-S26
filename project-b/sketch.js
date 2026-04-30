let captchas = [];
let current = 0;
let currentstate = "captchas";
let captchatimer = 0;
let rotateimg;
let sliderimg;
let story;

function preload(){
  rotateimg = loadImage("assets/rotate.png");
  sliderimg = loadImage("assets/slider.png");
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  captchatimer = frameCount;
  story = new Story();

  //setup captchas
  let checkbox = new Checkbox();
  let rotate = new Rotate(rotateimg);
  let slider = new Slider();
  captchas.push(checkbox);
  captchas.push(rotate);
  captchas.push(slider);
  
  checkbox.setup();
  rotate.setup();
  slider.setup();

  //show buttons for first captcha
  if (captchas[current] && captchas[current].showButtons){
    captchas[current].showButtons();
  }
}

function draw() {
  if (currentstate == "captchas"){
    //captcha section
    captchas[current].draw();
    if (captchas[current].solved){
      nextcaptcha();
    }
  } else if (currentstate == "story"){
    //story section
    story.update();
    story.draw();
    if (story.ended){
      currentstate = "ending";
    }
  } else if (currentstate == "ending"){
    story.draw();
  }
}

//handle mouse press
function mousePressed(){
  if (currentstate == "story"){
    story.mousePressed();
  } else if (currentstate == "ending"){
    if (story.ended && story.outcome == "granted"){
      restartcaptchas();
    }
  } else if (captchas[current] && captchas[current].mousePressed){
    captchas[current].mousePressed();
  }
}

function nextcaptcha(){
  //hide current captcha buttons (for captchas using it)
  if (captchas[current] && captchas[current].hideButtons){
    captchas[current].hideButtons();
  }

  if (current < captchas.length - 1){
    //next captcha
    current += 1;
    captchas[current].reset();
    captchas[current].setup();
    if (captchas[current] && captchas[current].showButtons){
      captchas[current].showButtons();
    }
  } else {
    //all captchas solved. start story
    currentstate = "story";
    story.start(captchatimer);
  }
}

//restart captcha after a good ending
function restartcaptchas(){
  current = 0;
  currentstate = "captchas";
  for (let i = 0; i < captchas.length; i++) {
    let captcha = captchas[i];
    if (captcha.reset){
      captcha.reset();
    }
    if (captcha.setup){
      captcha.setup();
    }
  }
  if (captchas[current] && captchas[current].showButtons){
    captchas[current].showButtons();
  }
}

//skip current captcha (for testing)
function keyPressed(){
  if (key == 's') {
    console.log("Skipping");
    if (currentstate == "captchas"){
      nextcaptcha();
    }
  }
}

