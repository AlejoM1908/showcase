const CANVAS_SIZE = 600;

let increment = 0.1;
let incStart = 0.005;
let magInc = 0.0005;
let start = 0;
let scale = 10;
let magOff = 0;
let zoff = 0;
let particles = [];
let numParticles = 1000;

let cols, rows;
let fps;
let flowfield;
let flowcolorfield;

let flowFieldShader;
let particleShader;

let showField = false;
let start_movement = false;

function preload() {
    flowFieldShader = loadShader('/showcase/assets/shader/flow.vert', '/showcase/assets/shader/flow.frag');
    particleShader = loadShader('/showcase/assets/shader/particle.vert', '/showcase/assets/shader/particle.frag');
}

function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    pixelDensity(1);
    cols = floor(CANVAS_SIZE / scale);
    rows = floor(CANVAS_SIZE / scale);
    background(0);

    for (let i = 0; i < numParticles; i++) {
        particles[i] = new Particle();
    }

    flowfield = new Array(rows * cols);
    flowcolorfield = new Array(rows * cols);
}

function draw() {
    if (showField) {
        background(0);
        drawFlowField();
    } else {
        background(color(0, 0, 0, 15));
        updateFlowField();
        updateParticles();
    }
}

function drawFlowField() {
    background(0);
    let yoff = start;

    for (let y = 0; y < rows; y++) {
        let xoff = start;

        for (let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let angle = noise(xoff, yoff, zoff) * TWO_PI;
            let v = p5.Vector.fromAngle(angle);
            let m = map(noise(xoff, yoff, magOff), 0, 1, -5, 5);

            v.setMag(m);

            push();
            stroke(255);
            translate(x * scale, y * scale);
            rotate(v.heading());
            let endpoint = abs(m) * scale;
            line(0, 0, endpoint, 0);

            if (m < 0) {
                stroke('red');
            } else {
                stroke('green');
            }

            line(endpoint - 2, 0, endpoint, 0);
            pop();

            flowfield[index] = v;
            flowcolorfield[index] = generateRandomColor(xoff, yoff, zoff);
            xoff += increment;
        }

        yoff += increment;
    }

    magOff += magInc;
    zoff += incStart;
    start -= magInc;
}

function updateFlowField() {
    let yoff = start;

    for (let y = 0; y < rows; y++) {
        let xoff = start;

        for (let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let angle = noise(xoff, yoff, zoff) * TWO_PI;
            let v = p5.Vector.fromAngle(angle);
            let m = map(noise(xoff, yoff, magOff), 0, 1, -5, 5);

            v.setMag(m);

            flowfield[index] = v;
            flowcolorfield[index] = generateRandomColor(xoff, yoff, zoff);
            xoff += increment;
        }

        yoff += increment;
    }

    magOff += magInc;
    zoff += incStart;
    start -= magInc;
}

function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield, flowcolorfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }

    if (random(10) > 5 && particles.length < 1500) {
        let rnd = floor(noise(zoff) * 20);
        for (let i = 0; i < rnd; i++) {
            particles.push(new Particle());
        }
    } else if (particles.length > 1000) {
        let rnd = floor(random(10));
        for (let i = 0; i < rnd; i++) {
            particles.shift();
        }
    }
}

function generateRandomColor(xoff, yoff, zoff) {
    return [
        noise(xoff, yoff, zoff) * 255,
        noise(xoff + 100, yoff + 100, zoff) * 255,
        noise(xoff + 200, yoff + 200, zoff) * 255
    ];
}

function keyPressed() {
    if (key === 'f') {
        showField = !showField;
    }
}

class Particle {
    constructor() {
        this.position = createVector(random(CANVAS_SIZE), random(CANVAS_SIZE));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxSpeed = 2;

        this.prevPos = this.position.copy();
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    show() {
        strokeWeight(1);
        line(this.position.x, this.position.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    inverseConstrain(pos, key, f, t) {
        if (pos[key] < f) {
            pos[key] = t;
            this.updatePrev();
        }
        if (pos[key] > t) {
            pos[key] = f;
            this.updatePrev();
        }
    }

    updatePrev() {
        this.prevPos.x = this.position.x;
        this.prevPos.y = this.position.y;
    }

    edges() {
        this.inverseConstrain(this.position, 'x', 0, CANVAS_SIZE);
        this.inverseConstrain(this.position, 'y', 0, CANVAS_SIZE);
    }

    follow(vectors, colorfield) {
        let x = floor(this.position.x / scale);
        let y = floor(this.position.y / scale);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
        let c = colorfield[index];

        if (c) {
            stroke(color(c[0], c[1], c[2]));
        }
    }
}