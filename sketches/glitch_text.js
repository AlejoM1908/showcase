const CANVAS_SIZE = 600;

let reset_draw = false;

let draw_canvas;
let movement;
let reset_button;
let glitch_shader;

/**
 * Load the required assets before main logic is executed.
 */
function preload() {
    glitch_shader = loadShader('/showcase/assets/shader/glitch.vert', '/showcase/assets/shader/glitch.frag');
}

/**
 * Setup the canvas and required assets.
*/
function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
    draw_canvas = createGraphics(CANVAS_SIZE, CANVAS_SIZE);

    draw_canvas.background(40);
    draw_canvas.stroke(255);
    draw_canvas.strokeWeight(4);

    movement = createSlider(0, 1, 0.5, 0.01);
    movement.position(10, CANVAS_SIZE - 30);

    reset_button = createButton('Reset');   
    reset_button.position(150, CANVAS_SIZE - 30);
    reset_button.mousePressed(switchReset);

    shader(glitch_shader);
}

/**
 * Main execution loop.
*/
function draw() {
    if (mouseIsPressed) {
        if (mouseX < 220 && mouseY > CANVAS_SIZE - 50) {
            return;
        }
        draw_canvas.line(mouseX, mouseY, pmouseX, pmouseY);
    }

    if (reset_draw) {
        draw_canvas.background(40);
        reset_draw = false;
    }

    showGlitch();
}

/**
 * Show the glitch effect over the user draw.
*/
function showGlitch() {
    glitch_shader.setUniform('texture', draw_canvas);
    glitch_shader.setUniform('movement', generateRandomMovement());

    rect(-width/2, -height/2, width, height);
}

/**
 * Generate a random movement vector value for the glitch effect.
*/
function generateRandomMovement() {
    let glitch_noise = noise(millis() / 100);

    if (glitch_noise < movement.value()) {
        return 0;
    }

    glitch_noise = pow((glitch_noise - movement.value()) * 1/(1 - movement.value()), 2);

    return glitch_noise;
}

/**
 * Reset the user draw.
*/
function switchReset() {
    reset_draw = true;
}

function keyPressed() {
    switch (key) {
    case 'r':
        switchReset();
        break;
    }
}