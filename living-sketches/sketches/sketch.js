let cat = [];
let zzz = [];
let but = [];
let bg;
let catframe = 0;
let butframe = 0;
let zzzframe = 0;
let butx;
let buty;
let catx = 0;
let caty = 380;

function preload() {
  cat[0] = loadImage("living-sketches/assets/cat2.png");
  cat[1] = loadImage("living-sketches/assets/cat1.png");
  cat[2] = loadImage("living-sketches/assets/cat0.png");
  zzz[0] = loadImage("living-sketches/assets/zzz0.png");
  zzz[1] = loadImage("living-sketches/assets/zzz1.png");
  zzz[2] = loadImage("living-sketches/assets/zzz2.png");
  but[0] = loadImage("living-sketches/assets/but0.png");
  but[1] = loadImage("living-sketches/assets/but1.png");
  but[2] = loadImage("living-sketches/assets/but2.png");
  bg = loadImage("living-sketches/assets/Background.png");
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  butx = random(width);
  buty = random(height - 200);
}

function draw() {
  background(220);
  image(bg, width/2, height/2, width, height);

  //Butterfly movement
  let dir;
  if (mouseIsPressed) {
    dir = mouseX - butx;
    butx = lerp(butx, mouseX, 0.1);
    buty = lerp(buty, mouseY, 0.1);
  } else {
    let move = cos(frameCount / 30);
    dir = move;
    butx = butx + move * 2;
    buty = buty + sin(frameCount / 30) * 2;
  }
  butframe = floor(map(sin(frameCount / 5), -1, 1, 0, but.length));

  push();
  translate(butx, buty);
  if (dir < 0) {
    scale(-1, 1);
  }
  image(but[butframe], 
        0, 
        0, 
        but[0].width * 0.12, 
        but[0].height * 0.12);
  pop();

  //Cat movement
  catx = lerp(catx, butx, 0.03);
  catframe = floor(frameCount / 8) % cat.length;
  let catdir = butx - catx;

  push();
  translate(catx, caty + sin(frameCount / 20) * 1.5);
  if (catdir < 0) {
    scale(-1, 1);
  }
  image(cat[catframe], 
        0, 
        0, 
        cat[0].width * 0.4, 
        cat[0].height * 0.4);
  pop();

  
  //Eat butterfly
  let eat = dist(catx, caty, butx, buty);
  if (eat < 40) {
    butx = random(width);
    buty = random(height - 200);
  }
  
  //Wake up when butterfly is close
  let zzzx = 250;
  let zzzy = 210 + sin(frameCount / 20) * 10;
  let sleep = dist(butx, buty, zzzx, zzzy);
  if (sleep > 80) {
    zzzframe = floor(frameCount / 12) % zzz.length;
    image(zzz[zzzframe], zzzx, zzzy, zzz[0].width * 0.1, zzz[0].height * 0.1);
  }
}