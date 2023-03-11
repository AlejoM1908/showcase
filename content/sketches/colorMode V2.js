let img;
let img2;

let hsbButton;
let hslButton;
let rgbButton;

function changeToHSB(){
    //colorMode(HSB, 360, 100, 100);
    colorMode(HSB);
    //preload();
    img.loadPixels();
  // Loop over every pixel in the image
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
        // Read the pixel's color
            let originalColor = img.get(x, y);

            // Inverse the color
            const r = red(originalColor);
            const g = green(originalColor);
            const b = blue(originalColor);
            let outputColor = color(r, g, b);

            // Set the pixel's color
            img2.set(x, y, outputColor);
        }
    }
  img2.updatePixels();
}

function changeToHSL() {
    //colorMode(HSL, 360, 100, 100);
    colorMode(HSL);
    //preload();
    img.loadPixels();
  // Loop over every pixel in the image
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
        // Read the pixel's color
            let originalColor = img.get(x, y);

            // Inverse the color
            const r = red(originalColor);
            const g = green(originalColor);
            const b = blue(originalColor);
            let outputColor = color(r, g, b);

            // Set the pixel's color
            img2.set(x, y, outputColor);
        }
    }
  img2.updatePixels();
}

function changeToRGB(){
    //colorMode(RGB, 360, 100, 100);
    colorMode(RGB);
    //preload();
    img.loadPixels();
  // Loop over every pixel in the image
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
        // Read the pixel's color
            let originalColor = img.get(x, y);

            // Inverse the color
            const r = 255 - red(originalColor);
            const g = 255 - green(originalColor);
            const b = 255 - blue(originalColor);
            let outputColor = color(r, g, b);

            // Set the pixel's color
            img2.set(x, y, outputColor);
        }
    }
  img2.updatePixels();
}

function preload() {
  img = loadImage("/workshops/assets/image/howl's_casttle.jpg");
  img2 = loadImage("/workshops/assets/image/howl's_casttle.jpg");
}

function setup() {
  createCanvas(400, 400);
  colorMode(RGB);

  hsbButton = createButton("HSB ColorMode");
  //hsbButton.mouseClicked(changeToHSB);

  hslButton = createButton("HSL ColorMode");
 //hslButton.mouseClicked(changeToHSL);

  rgbButton = createButton("Inverted RGB ColorMode");
  //rgbButton.mouseClicked(changeToRGB);

  img.resize(500, 500);

  
}

function draw() {
    hsbButton.mouseClicked(changeToHSB);
    hslButton.mouseClicked(changeToHSL);
    rgbButton.mouseClicked(changeToRGB);
    image(img2, 0, 0, width, height);
}