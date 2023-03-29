let strokeSize = 40;
let cicleSize = 200;
let division = 56;
let discoverSecret = 0;
let showEdges = 0;

function setup() {
    createCanvas(550, 400);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    noFill();
}

function draw() {
    background(280, 2, 50);

    drawCircle(strokeSize, cicleSize, [0, 270, 180, 60], 0, width / 4, height / 2);
    drawCircle(strokeSize, cicleSize, [0, 270, 180, 60], 1, width / 4 * 3, height / 2);
}

function drawCircle(stroke, size, hueArray, inverted, posX, posY) {
    push();
    strokeWeight(stroke);
    translate(posX, posY);
    rotate(frameCount * 0.32);

    // Primary Circle ring
    let colors = setColorsArray(hueArray, 0, inverted);
    setConicGradient(0, 0, 0, colors);
    if (!showEdges) ellipse(0, 0, size, size);

    strokeWeight(1);

    // Inner Edge ring
    colors = setColorsArray(hueArray, division, inverted);
    setConicGradient(0, 0, 0, colors);
    if (!discoverSecret) ellipse(0, 0, size - stroke - 1, size - stroke - 1);

    // Outter Edge ring
    colors = setColorsArray(hueArray, division, !inverted);
    setConicGradient(0, 0, 0, colors);
    if (!discoverSecret) ellipse(0, 0, size + stroke + 1, size + stroke + 1);
    pop();
}

function getColorValue(actual, change, isAdding) {
    if (actual - change < 0 && !isAdding) return (360 - change) + actual;
    else if (actual + change > 360 && isAdding) return change - (360 - actual);
    else if (isAdding) return actual + change;
    return actual - change
}

function setColorsArray(array, division, isInverted) {
    let response = [];

    for (let i = 0; i < array.length; i++) {
        append(response, color(getColorValue(array[i], division, isInverted), 100, 100, 80));
    }

    return response;
}

function setConicGradient(sA, cX, cY, colors) {
    let ranges = generateValues(colors);

    let gradient = drawingContext.createConicGradient(sA, cX, cY);

    for (let i = 0; i < ranges.length; i++) {
        gradient.addColorStop(ranges[i], colors[i]);
    }
    gradient.addColorStop(1, colors[0]);

    drawingContext.strokeStyle = gradient;
}

function generateValues(array) {
    let len = array.length;
    let ranges = [];

    for (let i = 0; i < 1; i += 1 / len) {
        append(ranges, round(i, 2));
    }

    return ranges;
}

function keyPressed() {
    switch (key) {
        case 'f':
            discoverSecret = !discoverSecret;
            break;
        case 'g':
            showEdges = !showEdges;
            break;
    }
}