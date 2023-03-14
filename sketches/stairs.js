let width = 600;
let height = 324;
let square_height = 40;
let show_squares = true;

function draw() {
    createCanvas(width, height);

    if (show_squares) printSquares(color(0));
    printLines(color(170));
}

function printSquare(x, y, length, color){
    fill(color);
    noStroke();
    quad(x - length, y + length,
        x + length, y + length,
        x + length, y - length,
        x - length, y - length);
}

function printStroke(x, y, length, weight, color){
    stroke(color);
    strokeWeight(weight);
    line(x, y, x+length, y);
}

function printLines(color){
    let lines = floor(height / square_height) + 1;

    for(let i = 0; i < lines; i++){
        printStroke(0, square_height * i, width, 2, color);
    }
}

function printSquareStrip(x, y, strip_height, color){
    let side = strip_height / 2;
    let squares_numbers = floor((width - x) / (strip_height * 2) + 1);


    for (let i = 0; i < squares_numbers; i++){
        printSquare(x + (i * (2 * strip_height)) , y, side, color)
    }
}

function printSquares(color){
    let strips = floor(height / square_height) + 1;
    let movement = 18;
    let mod = 2;

    for(let i = 0; i < strips; i++){
        printSquareStrip(38 + (movement * (i % mod)), 
        square_height * i + 19, 
        square_height, 
        color);
        
        if (i % mod == mod - 1) movement = movement * -1;
    }
}

function switchSquares(){
    show_squares = !show_squares;
}

function keyPressed() {
    /**
     * Used to control multiple function in the program
     */
    switch (key) {
        case 'f':
            switchSquares();
            break;
    }
}