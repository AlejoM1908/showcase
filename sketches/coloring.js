let img;
let img2;

let hsbButton;
let hslButton;
let rgbButton;
let rgbOriginalButton;


//HSB section
function rgbTohsv(r , g , b) {



	// R, G, B values are divided by 255
	// to change the range from 0..255 to 0..1
	r = r / 255.0;
	g = g / 255.0;
	b = b / 255.0;

	// h, s, v = hue, saturation, value
	var max = Math.max(r, Math.max(g, b)); // maximum of r, g, b
	var min = Math.min(r, Math.min(g, b)); // minimum of r, g, b
	var delta = max - min; // delta of max and min.
	var h = -1, s = -1;

	// if max and max are equal then h = 0
	if (max == min)
		h = 0;

	// if max equal r then compute h
	else if (max == r)
		h = (60 * ((g - b) / delta) + 360) % 360;

	// if max equal g then compute h
	else if (max == g)
		h = (60 * ((b - r) / delta) + 120) % 360;

	// if max equal b then compute h
	else if (max == b)
		h = (60 * ((r - g) / delta) + 240) % 360;

	// if max equal zero
	if (max == 0)
		s = 0;
	else
		s = (delta / max) * 100;

	// compute v
	var v = max * 100;

	let a = [];
	a.push(h.toFixed(2));
	a.push(s.toFixed(2));
	a.push(v.toFixed(2));
	return(a);

}

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
            
            let colors = rgbTohsv(r,g,b);

            let outputColor = color(colors[0], colors[1], colors[2]);

            // Set the pixel's color
            img2.set(x, y, outputColor);
        }
    }
  img2.updatePixels();
}

//HSL section

function rgbToHsl(r, g, b){
  r /= 255.0, g /= 255.0, b /= 255.0;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      let d = (max - min);
      s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
      switch(max){
          case r: h = ((g - b) / d + 0)*60; break;
          case g: h = ((b - r) / d + 2)*60; break;
          case b: h = ((r - g) / d + 4)*60; break;
      }
  }

  return [h, s, l];
}

function returnUsableColorHsl(hsl){
  let a = [];
  a.push(Math.round(hsl[0]));
  a.push(Math.round(hsl[1]*100));
  a.push(Math.round(hsl[2]*100));
  return a;
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

            let colors = returnUsableColorHsl(rgbToHsl(r,g,b));

            let outputColor = color(colors[0], colors[1], colors[2]);

            // Set the pixel's color
            img2.set(x, y, outputColor);
        }
    }
  img2.updatePixels();
}

//Invert RGB section
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

function originalImage(){
    colorMode(RGB);
    img.loadPixels();
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let originalColor = img.get(x, y);

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

function preload() {
  img = loadImage('/showcase/assets/image/hero.jpeg');
  img2 = loadImage('/showcase/assets/image/hero.jpeg');
}

function setup() {
  createCanvas(500, 450);
  colorMode(RGB);

  rgbOriginalButton = createButton("Original RGB");

  rgbButton = createButton("Inverted RGB ColorMode");

  hsbButton = createButton("HSB ColorMode");
  //hsbButton.mouseClicked(changeToHSB);

  hslButton = createButton("HSL ColorMode");
 //hslButton.mouseClicked(changeToHSL);

  
  //rgbButton.mouseClicked(changeToRGB);

  img.resize(500, 450);
  img2.resize(500, 450);

  
}

function draw() {
    rgbOriginalButton.mouseClicked(originalImage);
    hsbButton.mouseClicked(changeToHSB);
    hslButton.mouseClicked(changeToHSL);
    rgbButton.mouseClicked(changeToRGB);
    image(img2, 0, 0, width, height);
}