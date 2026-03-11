let t = 0;
let s = 20;
let panic = 0;
let starve = 1;
let foodx, foody;
let food1x, food1y;
let food2x, food2y;
let creaturex, creaturey;

function setup(){
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100, 100, 100, 100);
  rectMode(CENTER);
  noStroke();
  creaturex = width / 2;
  creaturey = height / 2;
  spawnfood();
}

function draw() {
  let hue = lerp(40, 0, panic);
  let bghue = lerp(80, 0, panic);
  updatepanic();
  drawbg(hue, bghue);
  movecell();
  drawfood();
  updatefood();

  push();
  let shake = panic * 5;
  let shakex = map(noise(frameCount * 0.2), 0, 1, -shake, shake);
  let shakey = map(noise(frameCount * 0.2 + 100), 0, 1, -shake, shake);
  translate(creaturex + shakex, creaturey + shakey);
  scale(0.7);
  drawcell(hue);
  pop();
  
  outercircle(hue);
  drawbar(hue);
}


function updatefood(){
  if (dist(creaturex, creaturey, foodx, foody) < 40) {
    panic -= 0.4;
    foodx = random(40, width - 40);
    foody = random(80, height - 40);
  }
  if (dist(creaturex, creaturey, food1x, food1y) < 40) {
    panic -= 0.4;
    food1x = random(40, width - 40);
    food1y = random(80, height - 40);
  }
  if (dist(creaturex, creaturey, food2x, food2y) < 40) {
    panic -= 0.4;
    food2x = random(40, width - 40);
    food2y = random(80, height - 40);
  }
}

function spawnfood(){

  foodx = random(40, width - 40);
  foody = random(80, height - 40);
  food1x = random(40, width - 40);
  food1y = random(80, height - 40);
  food2x = random(40, width - 40);
  food2y = random(80, height - 40);
}

function drawfood(){
  let pulse = sin(frameCount * 0.1) * 3;

  fill(80, 80, 100);
  ellipse(foodx, foody, 14 + pulse);
  fill(80, 80, 100, 30);
  ellipse(foodx, foody, 24 + pulse);
  fill(80, 80, 100);
  ellipse(food1x, food1y, 14 + pulse);
  fill(80, 80, 100, 30);
  ellipse(food1x, food1y, 24 + pulse);
  fill(80, 80, 100);
  ellipse(food2x, food2y, 14 + pulse);
  fill(80, 80, 100, 30);
  ellipse(food2x, food2y, 24 + pulse);
}

function updatepanic(){

  panic += 0.001;
  panic = constrain(panic, 0, 1);
  starve = 1 - panic;
}

function drawbg(h, b){

  background(h, 25, 70);
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.001);
  translate(-width / 2, -height / 2);
  for (let i = s / 2; i <= width; i += s) {
    for (let j = s / 2; j <= height - 40; j += s) {
      let off = map(noise(0.01 * frameCount + i * j), 0, 1, 0, s);
      if (noise(i * j) < 0.18) {
        let jitter = 1;
        if (random() < 0.1) {
          jitter = random(0.8, 1.2);
        }
        fill(h, 30, 50, 20);
        ellipse(i, j, off * jitter);
        fill(h, 30, 50, 40);
        ellipse(i, j, off * 0.7 * jitter);
        fill(h, 40, 50, 80);
        ellipse(i, j, off * 0.5);
      }
    }
  }
  pop();
}

function outercircle(b){
  let mx = constrain(mouseX, 0, width);
  let my = constrain(mouseY, 0, height);
  for (let angle = 0; angle < 2 * PI; angle += PI / 36) {
    let x = width / 2 + 500 * cos(angle);
    let y = height / 2 + 350 * sin(angle);
    let d = constrain(dist(mx, my, x, y), 0, height * width);
    let size =
      map(sin(frameCount * 0.02), -1, 1, 0.7, 0.8) *
      map(d * d, 0, height * width, 100, 400);
    fill(b, 50, 10, 50);
    ellipse(x, y, size * 1.2);
    fill(b, 50, 10, 100);
    ellipse(x, y, size * 1.1);
  }
}

function movecell(){
  let speed = 0.04 + panic * 0.1;
  if (mouseIsPressed) {
    creaturex = lerp(creaturex, mouseX, speed);
    creaturey = lerp(creaturey, mouseY, speed);
  } 
  else {
    let range = 40
    let movex = creaturex + (noise(t) - 0.5) * 2 * range;
    let movey = creaturey + (noise(t + 100) - 0.5) * 2 * range;
    t += 0.01 + panic * 0.03;
    if (starve < 0.1) {
      let targetx = foodx;
      let targety = foody;
      let d0 = dist(creaturex, creaturey, foodx, foody);
      let d1 = dist(creaturex, creaturey, food1x, food1y);
      let d2 = dist(creaturex, creaturey, food2x, food2y);

      if (d1 < d0 && d1 < d2) {
        targetx = food1x;
        targety = food1y;
      }
      else if (d2 < d0 && d2 < d1) {
        targetx = food2x;
        targety = food2y;
      }
      movex = lerp(movex, targetx, 0.2);
      movey = lerp(movey, targety, 0.2);
    }
    creaturex = lerp(creaturex, movex, 0.1);
    creaturey = lerp(creaturey, movey, 0.1);
  }
  if (creaturex < 40) creaturex += 2;
  if (creaturex > width - 40) creaturex -= 2;
  if (creaturey < 80) creaturey += 2;
  if (creaturey > height - 40) creaturey -= 2;
}

function drawcell(hue) {
  drawbody(hue, 1, 30);
  drawbody(hue, 0.5, 30);
  nucleus(hue);
}

function drawbody(h, size, transparency){
  fill(h, 100, 70, transparency);
  let breathspeed;
  if (panic > 0.9) {
    breathspeed = 0.4;
  }
  else if (panic > 0.6) {
    breathspeed = 0.15;
  } 
  else if (panic > 0.3) {
    breathspeed = 0.05;
  } 
  else {
    breathspeed = 0.01;
  }
  let breath = sin(frameCount * breathspeed) * 10;

  beginShape();
  for (let a = 0; a < TWO_PI; a += PI / 48) {
    let n = noise(a, frameCount * 0.02) * 20;
    let radius = (40 + breath + n) * size;
    vertex(cos(a) * radius, sin(a) * radius);

  }
  endShape();
}

function nucleus(h){
  let shake = panic * 10;
  let nucleusx = map(noise(frameCount * 0.12), 0, 1, -shake, shake);
  let nucleusy = map(noise(frameCount * 0.1), 0, 1, -shake, shake);
  fill(h, 80, 90);
  ellipse(nucleusx, nucleusy, 20);
}

function drawbar(h){
  fill(h, 80, 70);
  rect(width / 2, 20, 200, 20);
  fill(h, 80, 100);
  rect(width / 2, 20, 190 * starve, 12);
}