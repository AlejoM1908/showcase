// Defining the required constant parameters
const WIDTH = 600;
const HEIGHT = 350;
const SQUARE_SIZE = 28;
const STRIP_MOVEMENT = 16;
const STAIRS = 2;

// Defining the required flags
let show_squares = true;

/**
 * Is the main excecution loop that allows interactivity with the code
*/
function draw() {
    createCanvas(WIDTH, HEIGHT);
    background(240);

    if (show_squares) printSquares(color(0));
    printLines(color(170));
}

/**
 * Used to print a single square to the canvas
 * @Param {number} posX - The position in the X axis inside the canvas
 * @Param {number} posY - The position in the Y axis inside the canvas
 * @Param {object} color - The color of the square
*/
function printSquare(posX, posY, color){
    fill(color);
    noStroke();
    const half_size = SQUARE_SIZE / 2;

    quad(posX - half_size, posY + half_size, // Left top corner
        posX + half_size, posY + half_size,  // Right top corner
        posX + half_size, posY - half_size,  // Right bottom corner
        posX - half_size, posY - half_size); // Left bottom corner
}

/**
 * Used to print a single line in the canvas
 * @Param {number} posX - The position in the X axis inside the canvas
 * @Param {number} posY - The position in the Y axis inside the canvas
 * @Param {number} length - The length of the line in the canvas
 * @Param {number} weight - The weight of the line in the canvas
 * @Param {object} color - The color of the line
*/
function printStroke(posX, posY, length, weight, color){
    stroke(color);
    strokeWeight(weight);
    line(posX, posY, posX + length, posY);
}

/**
 * Used to print all the required lines in the canvas
 * @Param {object} color - The color of the lines
*/
function printLines(color){
    let lines_number = floor(HEIGHT / SQUARE_SIZE) + 1;

    for(let i = 0; i < lines_number; i++){
        // Move each line one square size to the bottom
        printStroke(0, SQUARE_SIZE * i, WIDTH, 2, color);
    }
}

/**
 * Used to draw a row of squares of size SQUARE_SIZE separated by the same constant until end of canvas
 * @Param {number} posX - The position in the X axis inside the canvas
 * @Param {number} posY - The position in the Y axis inside the canvas
 * @Param {object} color - The color of the squares in the row
*/
function printSquareStrip(posX, posY, color){
    let squares_numbers = ceil((WIDTH - posX) / (SQUARE_SIZE * 2));

    for (let i = 0; i < squares_numbers; i++){
        // Print each square followed by a blank space
        printSquare(posX + (i * (2 * SQUARE_SIZE)) , posY, color)
    }
}

/**
 * Used to draw all the required squares
 * @Param {object} color - The color of the squares
*/
function printSquares(color){
    let strips_number = ceil(HEIGHT / SQUARE_SIZE);
    let translation = STRIP_MOVEMENT;

    for(let i = 0; i < strips_number; i++){
        printSquareStrip(SQUARE_SIZE / 2 + (translation * (i % STAIRS)), 
        SQUARE_SIZE * i + SQUARE_SIZE / 2,
        color);
        
        if (i % STAIRS == STAIRS - 1) translation = translation * -1;
    }
}

/**
 * Used to activate/deactivate the trick of the visual effect
*/
function switchSquares(){
    show_squares = !show_squares;
}

/**
 * Used to control multiple function in the program
*/
function keyPressed() {
    switch (key) {
        case 'f':
            switchSquares();
            break;
    }
}

