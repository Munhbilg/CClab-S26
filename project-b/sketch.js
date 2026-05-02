let captchas = [];
let current = 0;
let currentstate = "captchas";
let captchatimer = 0;
let rotateimg;
let sliderimg;
let story;
let rot = 0;
let loadingstart = 0;
let slidesound;

function preload(){
  rotateimg = loadImage("assets/rotate.png");
  sliderimg = loadImage("assets/slider.png");
  slidesound = loadSound("assets/slide.mp3");
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  captchatimer = frameCount;
  story = new Story();

  //setup captchas
  let checkbox = new Checkbox(slidesound);
  let rotate = new Rotate(rotateimg);
  let slider = new Slider();

  captchas.push(checkbox);
  captchas.push(rotate);
  captchas.push(slider);
  
  checkbox.setup();
  rotate.setup();
  slider.setup();
}

function draw(){
  if(currentstate == "captchas"){
    //captcha section
    captchas[current].draw();

    if(captchas[current].solved){
      startloading();
    }

  }else if(currentstate == "loading"){
    //loading section 
    background(240);
    loader(width / 2, height / 2);

    //after loading go next
    if(frameCount - loadingstart > random(60, 240)){
      nextcaptcha();
    }

  }else if(currentstate == "story"){
    //story section
    story.update();
    story.draw();

    if(story.ended){
      currentstate = "ending";
    }

  }else if(currentstate == "ending"){
    //ending section
    story.draw();
  }
}

//mouse
function mousePressed(){
  if(currentstate == "story"){
    story.mousePressed();

  }else if(currentstate == "ending"){
    if(story.ended && story.outcome == "granted"){
      restartcaptchas();
    }

  }else if(captchas[current].mousePressed){
    captchas[current].mousePressed();
  }
}

//start loading between captchas
function startloading(){
  currentstate = "loading";
  loadingstart = frameCount;
}

function nextcaptcha(){
  if(current < captchas.length - 1){
    //next captcha
    current += 1;
    captchas[current].reset();
    captchas[current].setup();
    currentstate = "captchas";

  }else{
    //all captchas solved. start story
    currentstate = "story";
    story.start(captchatimer);
  }
}

//restart captcha after a good ending
function restartcaptchas(){
  current = 0;
  currentstate = "captchas";

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

//skip current captcha (for testing)
function keyPressed(){
  if(key == 's'){
    console.log("Skipping");

    if(currentstate == "captchas"){
      startloading();
    }
  }
}

//loader animation
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