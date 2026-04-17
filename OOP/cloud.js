class Cloud {
    // constructor, this is like the setup
    //the setup of our variables
    constructor(x, y, sc) {
        this.x = x;
        this.y = y;
        this.sc = sc;
        this.speedX = map(this.sc, 0.5, 1, 5, 1);
        this.x0 = this.x;
        this.y0 = this.y;
        this.isDone = false;
        this.h = random(100);
        this.sound = thunder;
        this.isRaining = false;
    }
    //detect collision
    checkCollision(other){
        let d = dist(this.x, this.y, other.x, other.y);
        if(d < (this.sc+other.sc)*80){
            console.log("boom!");
            this.h = random(100);
            this.isRaining = true;
            if (this.sound.isPlaying() == false) {
                this.sound.play();
            }
         }else {
            this.isRaining = false;
        }
    }
    //everything that will draw the cloud
    display() {
        push();
        translate(this.x, this.y);
        scale(this.sc);
        this.drawRightArm();
        this.drawLeftArm();
        noStroke();
        //body
        colorMode(HSB, 100);
        fill(this.h, 30, 100);
        circle(0, 0, 100);
        //circles around
        for (let a = 0; a < 2 * PI; a += PI / 6) {
            push();
            rotate(a);
            circle(50, 30, 50);
            pop();
        }
        //eyes
        fill(0);
        circle(-30, 0, 5);
        circle(30, 0, 5);
        arc(0, 0, 30, 30, 0, PI);
        pop();
    }
    //updates the variables
    update() {
        this.y = lerp(this.y, this.y0 - 200 * noise(frameCount * 0.01), 0.1);
        this.x = this.x + this.speedX;
        if (this.x > width + this.sc * 100) {
            this.isDone = true;
        }
    }

    drawRightArm() {
        //arms
        push();
        beginShape();
        let lineLength2 = 100;
        noFill();
        for (let i = 0; i <= lineLength2; i += lineLength2 / 20) {
            strokeWeight(10);
            let v = 20 * sin(frameCount * 0.1 - i / 0.1);
            vertex(i, v);
        }
        endShape();
        pop();
    }
    drawLeftArm() {
        //arms
        push();
        scale(-1, 1);
        beginShape();
        let lineLength2 = 100;
        noFill();
        for (let i = 0; i <= lineLength2; i += lineLength2 / 20) {
            strokeWeight(10);
            let v = 20 * sin(frameCount * 0.1 - i / 0.1);
            vertex(i, v);
        }
        endShape();
        pop();
    }
}

