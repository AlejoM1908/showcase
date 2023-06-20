const CANVAS_SIZE = 600;

let increment = 0.1;
let incStart = 0.005;
let magInc = 0.0005;
let start = 0;
let scale = 10;
let cols, rows;
let zoff = 0;
let fps;
let particles = [];
let numParticles = 1000;
let flowfield;
let flowcolorfield;
let magOff = 0;
let showField = false;

let start_movement = false;

let flowFieldShader;
let particleShader;
let particleTexture;
let particleVAO;

function preload() {
    flowFieldShader = loadShader('/showcase/assets/shader/flow.vert', '/showcase/assets/shader/flow.frag');
    particleShader = loadShader('/showcase/assets/shader/particle.vert', '/showcase/assets/shader/particle.frag');
}

function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
    cols = floor(CANVAS_SIZE / scale);
    rows = floor(CANVAS_SIZE / scale);

    initializeFlowField();

    particleTexture = createGraphics(CANVAS_SIZE, CANVAS_SIZE);
    particleTexture.noStroke();
    particleTexture.fill(255);
    particleTexture.circle(0, 0, 4);

    initializeParticles();
}

function draw() {
    background(0);

    if (showField) {
        drawFlowField();
    } else {
        updateFlowField();
        updateParticles();
    }
}

function initializeFlowField() {
    flowfield = createGraphics(cols, rows, WEBGL);
    flowfield.noStroke();
    flowfield.shader(flowFieldShader);

    flowFieldShader.setUniform('scale', scale);
    flowFieldShader.setUniform('cols', cols);
    flowFieldShader.setUniform('rows', rows);
}

function drawFlowField() {
    flowfield.shader(flowFieldShader);
    flowFieldShader.setUniform('time', frameCount * 0.1);
    flowfield.rect(-width / 2, -height / 2, width, height);
}

function updateFlowField() {
    flowfield.shader(flowFieldShader);
    flowFieldShader.setUniform('time', frameCount * 0.1);
    flowFieldShader.setUniform('update', true);
    flowfield.rect(-width / 2, -height / 2, width, height);
    flowFieldShader.setUniform('update', false);
}

function initializeParticles() {
    particleVAO = createGraphics(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
    particleVAO.noStroke();
    particleVAO.shader(particleShader);
    particleShader.setUniform('texture', particleTexture);

    for (let i = 0; i < numParticles; i++) {
        particles[i] = createVector(random(CANVAS_SIZE), random(CANVAS_SIZE));
    }
}

function updateParticles() {
    particleVAO.shader(particleShader);
    particleShader.setUniform('time', frameCount * 0.1);

    particleVAO.beginShape(POINTS);
    for (let i = 0; i < numParticles; i++) {
        let p = particles[i];
        particleShader.setUniform('position', [p.x, p.y]);
        particleVAO.vertex(p.x, p.y);
    }
    particleVAO.endShape();

    particleShader.setUniform('update', true);
    particleVAO.beginShape(POINTS);
    for (let i = 0; i < numParticles; i++) {
        let p = particles[i];
        let dx = map(noise(p.x * increment, p.y * increment, zoff), 0, 1, -1, 1);
        let dy = map(noise(p.x * increment, p.y * increment, zoff + 100), 0, 1, -1, 1);
        p.add(createVector(dx, dy).mult(2));
        p.x = constrain(p.x, 0, CANVAS_SIZE);
        p.y = constrain(p.y, 0, CANVAS_SIZE);
        particleShader.setUniform('position', [p.x, p.y]);
        particleVAO.vertex(p.x, p.y);
    }
    particleVAO.endShape();
    particleShader.setUniform('update', false);

    zoff += incStart;
}

function keyPressed() {
    if (key === 'f') {
        showField = !showField;
    }
}
