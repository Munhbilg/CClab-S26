let t = 0;
let panic = 0;
let starve = 1;

let creatureX, creatureY;
let s = 20;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100, 100, 100, 100);
  rectMode(CENTER);
  noStroke();

  creatureX = width / 2;
  creatureY = height / 2;
}

function draw() {
  updatePanic();
  drawBackground();
  mousemovement();

  let hue = lerp(40, 0, panic);

  drawBar(hue);

  push();
  let shake = panic * 5;
  let shakeX = map(noise(frameCount * 0.2), 0, 1, -shake, shake);
  let shakeY = map(noise(frameCount * 0.2 + 1000), 0, 1, -shake, shake);

  translate(creatureX + shakeX, creatureY + shakeY);
  scale(0.7);
  drawCreature(hue);
  pop();
}

function updatePanic() {
  panic += 0.001;
  if (mouseIsPressed) {
    panic -= 0.004;
  }

  panic = constrain(panic, 0, 1);
  starve = 1 - panic;
}

function drawBackground() {
  let c = map(cos(frameCount * 0.01), -1, 1, 60, 80);
  background(c, 100, 15);

  for (let i = s / 2; i <= width; i += s) {
    for (let j = s / 2; j <= height; j += s) {

      let off = map(noise(0.01 * frameCount + i * j), 0, 1, 0, s);

      if (noise(i * j) < 0.18) {
        let jitter = 1;
        if (random() < 0.1) {
          jitter = random(0.8, 1.2);
        }

        fill(c, 30, 100, 12);
        ellipse(i, j, off * jitter);

        fill(c, 30, 100, 25);
        ellipse(i, j, off * 0.7 * jitter);

        fill(c, 40, 100, 80);
        ellipse(i, j, off * 0.5);
      }
    }
  }

  for (let angle = 0; angle < 2 * PI; angle += PI / 12) {
    let x = width / 2 + 490 * cos(angle);
    let y = height / 2 + 300 * sin(angle);

    let d = constrain(dist(creatureX, creatureY, x, y), 0, height * width);

    let size =
      map(sin(frameCount * 0.02), -1, 1, 0.7, 1) *
      map(d * d, 0, height * width, 200, 400);

    fill(c, 90, 10, 90);
    ellipse(x, y, size);

    fill(c, 90, 10, 20);
    ellipse(x, y, size * 1.5);
  }
}

function mousemovement() {
  let speed = 0.03 + panic * 0.05;

  if (mouseIsPressed) {
    creatureX = lerp(creatureX, mouseX, speed);
    creatureY = lerp(creatureY, mouseY, speed);
  } else {
    let range = 40 + panic * 120;
    let moveX = creatureX + map(noise(t), 0, 1, -range, range);
    let moveY = creatureY + map(noise(t + 1000), 0, 1, -range, range);
    t += 0.005 + panic * 0.04;

    creatureX = lerp(creatureX, moveX, speed);
    creatureY = lerp(creatureY, moveY, speed);
  }

  creatureX = constrain(creatureX, 20, width - 20);
  creatureY = constrain(creatureY, 60, height - 20);
}

function drawCreature(hue) {
  drawbody(hue, 1, 30);
  drawbody(hue, 0.5, 30);
  draweye(hue);
}

function drawbody(h, size, transparency) {
  fill(h, 80, 90, transparency);

  let breath = sin(frameCount * 0.02) * (8 + panic * 25);

  beginShape();
  for (let a = 0; a < TWO_PI; a += PI / 48) {
    let n = noise(a, frameCount * 0.02) * 20;
    let radius = (30 + breath + n + panic * 40) * size;
    vertex(cos(a) * radius, sin(a) * radius);
  }
  endShape(CLOSE);
}

function draweye(h) {
  let shake = panic * 10;
  let pupilx = map(noise(frameCount * 0.12), 0, 1, -shake, shake);
  let pupily = map(noise(frameCount * 0.1), 0, 1, -shake, shake);

  fill(h, 80, 90);
  ellipse(pupilx, pupily, 20);
}

function drawBar(h) {
  fill(h, 80, 30);
  rect(width / 2, 20, 200, 20);

  fill(h, 80, 90, 100 * starve);
  rect(width / 2, 20, 190 * starve, 12);
}