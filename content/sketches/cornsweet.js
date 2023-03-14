let back_hue, first_gradient, second_gradient;

function setup() {
  /**
   * Used to initialice the global variables for the program
   */
  createCanvas(500, 500);
  // Stablish visual effect colors
  first_gradient = color(0); // Darker color of the gradient
  second_gradient = color(255); // Brighter color of the gradient
  back_hue = color(124, 125, 128); // Background
}

function draw() {
  /**
   * Loop function that draws the program every frame
   */
  noStroke();
  background(240, 240, 240);

  // Create the shapes of the cornsweet effect
  printShapes();

  // Detect mouse click, then place a rectangle to reveal the trick
    if (mouseIsPressed) {
        printRectangle(mouseX, mouseY, 150, 50, back_hue);
    }
}

function printShapes(){
  /**
   * Used to print the figures used to create the visual effect
   * 
   * Prints all the shapes to the canvas
   */
  // Sky
  fill(9, 145, 207);
  quad(0, 0, 500, 0, 500, 250, 0, 250);

  // Ground
  fill(106, 100, 69);
  quad(0, 250, 500, 250, 500, 500, 0, 500);

  // Shadow
  fill(0, 59);
  quad(135, 400, 365, 400, 420, 500, 80, 500);

  // Main shape
  fill(back_hue);
  quad(150, 50, 350, 50, 400, 200, 100, 200);
  quad(100, 300, 400, 300, 350, 450, 150, 450);

  // Center gradient piece that create the visual effect
  gradient(100, 200, 300, 50, back_hue, first_gradient, 0, 0.5);
  gradient(100, 250, 300, 50, second_gradient, back_hue, 0.2, 1);
}

function printRectangle(x, y, horizontal, vertical, color){
  /**
   * Used to print the rectangle that reveals the visual effect trick
   * 
   * @param x - The x position of the center of the rectangle in the canvas
   * @param y - The y position of the center of the rectangle in the canvas
   * @param horizontal - The horizontal length from the center to a side of the rectangle
   * @param vertical - The vertical length from the center to a side of the rectangle
   * @param color - Filling color of the rectangle
   * 
   * Prints the shape to the canvas
   */
    fill(color);
    quad(x - horizontal,
        y + vertical,
        x + horizontal,
        y + vertical,
        x + horizontal,
        y - vertical,
        x - horizontal,
        y - vertical);
}

function gradient(x, y, width, height, hue1, hue2, op1, op2) {
  /**
   * Used to generate a gradient strip with the two given colors
   * 
   * Prints the gradient strip to the canvas
   */
  for (let i = y; i <= y + height; i++) {
    let inter = map(i, y, y + height, op1, op2);
    let c = lerpColor(hue1, hue2, inter);
    stroke(c);
    strokeWeight(2);
    line(x, i, x + width, i);
  }
}
