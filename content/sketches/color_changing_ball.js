let isInverse = 0;
let showSecret = 0;
let movement = 0;

function setup() {
    createCanvas(600, 400);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
}

function draw() {
    background(171, 0, 80);

    getLinearGradient(
        -320, height / 2,
        width, height / 2,
        color(231, 100, 50, 100),
        color(188, 40, 100, 100)
    )

    if (!showSecret) rect(0, 0, 1200, 800, 0);

    printBall();
}

function getLinearGradient(sX, sY, eX, eY, colorS, colorE) {
    let gradient = drawingContext.createLinearGradient(sX, sY, eX, eY);

    gradient.addColorStop(0, colorS);
    gradient.addColorStop(1, colorE);

    drawingContext.fillStyle = gradient;
}

function printBall() {
    push();
    translate(60 + movement, height / 2);
    noStroke();
    fill(color(189, 100, 100, 100));
    ellipse(0, 0, 80, 80)
    pop();

    moveBall();
}

function moveBall() {
    if (!isInverse) movement += 5;
    else movement -= 5;

    if (movement > 440 || movement < 0) isInverse = !isInverse;
}

function keyPressed() {
    switch (key) {
        case 'f':
            showSecret = !showSecret;
            break;
    }
}