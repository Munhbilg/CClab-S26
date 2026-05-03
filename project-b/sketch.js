let captchas = [];
let robot = [];
let current = 0;
let captchatimer = 0;
let rot = 0;
let loadingstart = 0;
let story;
let currentstate = "captchas";
let rotateimg;
let slidese, errorse, correctse, rotate1se, rotate2se, catse;
let grantedse, deniedse;
let video;

function preload(){
  rotateimg = loadImage("assets/rotate.png");

  slidese = loadSound("assets/slide.mp3");
  errorse = loadSound("assets/error.mp3");
  correctse = loadSound("assets/correct.mp3");
  rotate1se = loadSound("assets/rotate1.mp3");
  rotate2se = loadSound("assets/rotate2.mp3");
  catse = loadSound("assets/cat.mp3");
  grantedse = loadSound("assets/granted.mp3");
  deniedse = loadSound("assets/denied.mp3");

  for (let i = 0; i < 8; i++){
    let name = "assets/robot" + (i + 1) + ".mp3";
    robot[i] = loadSound(name);
  }
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  captchatimer = frameCount;
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  story = new Story(robot, grantedse, deniedse, video);

  let checkbox = new Checkbox(slidese);
  let rotate = new Rotate(rotateimg, rotate1se, rotate2se, errorse);
  let slider = new Slider(catse);
  let timer = new Timer(errorse);
  let click = new Click(errorse, correctse);
  captchas.push(checkbox);
  captchas.push(rotate);
  captchas.push(slider);
  captchas.push(timer);
  captchas.push(click);
  checkbox.setup();
  rotate.setup();
  slider.setup();
  timer.setup();
  click.setup();
}

function draw(){
  if(currentstate == "captchas"){
    captchas[current].draw();

    // FIX: prevent sound spam + multiple triggers
    if(captchas[current].solved && currentstate == "captchas"){
      correctse.play();
      captchas[current].solved = false;
      startloading();
    }

  } else if(currentstate == "loading"){
    background(240);
    loader(width / 2, height / 2);

    if(frameCount - loadingstart > random(60, 240)){
      nextcaptcha();
    }

  } else if(currentstate == "story"){
    story.update();
    story.draw();

    if(story.ended){
      currentstate = "ending";
    }

  } else if(currentstate == "ending"){
    story.draw();
  }
}

//mouse
function mousePressed(){
  if(currentstate == "story"){
    story.mousePressed();
  }
  else if(currentstate == "ending"){
    if(story.ended && story.outcome == "granted"){
      restartcaptchas();
    }
  }
  else if(captchas[current].mousePressed){
    captchas[current].mousePressed();
  }
}

function startloading(){
  currentstate = "loading";
  loadingstart = frameCount;
}

function nextcaptcha(){
  if(current < captchas.length - 1){
    current += 1;
    if(captchas[current].reset){
      captchas[current].reset();
    }
    if(captchas[current].setup){
      captchas[current].setup();
    }

    currentstate = "captchas";
  }
  else{
    currentstate = "story";
    story.start(captchatimer);
  }
}

function restartcaptchas(){
  current = 0;
  currentstate = "captchas";
  captchatimer = frameCount;
  for(let i = 0; i < captchas.length; i++){
    let captcha = captchas[i];
    if(captcha.reset){
      captcha.reset();
    }
    if(captcha.setup){
      captcha.setup();
    }
  }
}

//skip captcha
function keyPressed(){
  if(key == 's'){
    console.log("Skipping");
    if(currentstate == "captchas"){
      startloading();
    }
  }
  else if(captchas[current].keyPressed){
    captchas[current].keyPressed();
  }
}

//loading animation
function loader(cx, cy){
  let s = map(sin(frameCount * 0.05), -1, 1, 0.05, 0.1);
  rot += s;
  push();
  translate(cx, cy);
  rotate(rot);

  for(let i = 0; i < 15; i++){
    let angle = TWO_PI * i / 15;
    let x = cos(angle) * 30;
    let y = sin(angle) * 30;
    let transparency = map(i, 0, 14, 255, 0);
    fill(150, transparency);
    noStroke();
    ellipse(x, y, 10);
  }
  pop();
}