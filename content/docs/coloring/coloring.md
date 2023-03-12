---
weight: 1
---



# HSL Color Mode

HSL color mode is a way of representing colors in terms of three properties: hue, saturation, and lightness. The HSL color model is based on the concept of a color wheel, where colors are arranged in a circle according to their hue. Hue is measured in degrees, with red at 0°, green at 120°, and blue at 240°, and all other hues arranged between these three primary colors.

Saturation is a measure of how intense or pure a color is, and is expressed as a percentage from 0% (fully desaturated) to 100% (fully saturated). In HSL color mode, a fully saturated color has no white, gray, or black added to it, while a desaturated color has some degree of white, gray, or black added to it.

Lightness refers to the brightness of a color, and is also expressed as a percentage from 0% (completely black) to 100% (completely white). In HSL color mode, lightness is distinct from saturation, meaning that a color can be both highly saturated and highly light (such as a bright, neon color), or highly desaturated and dark (such as a dark, muted color).

One of the advantages of using HSL color mode is that it allows for greater flexibility and control over color choices, since the hue, saturation, and lightness values can be adjusted independently of each other. For example, if you have a color that you like but want to make it lighter or darker, you can adjust the lightness value without changing the hue or saturation.

Overall, HSL color mode is a powerful tool for working with color, whether you're designing graphics, creating artwork, or building a website. By understanding how the three properties of hue, saturation, and lightness work together, you can create a virtually unlimited range of colors and achieve the desired visual effect.

# HSB Color Mode
HSB color mode is another way of representing colors using three values: hue, saturation, and brightness. HSB stands for Hue, Saturation, and Brightness, and is also sometimes referred to as HSV (Hue, Saturation, Value).

In HSB color mode, hue is still represented by a color wheel, where colors are arranged in a circle according to their hue angle. Hue is measured in degrees, with red at 0°, green at 120°, and blue at 240°, and all other hues arranged between these three primary colors.

Saturation is again a measure of how intense or pure a color is, expressed as a percentage from 0% (fully desaturated) to 100% (fully saturated). In HSB color mode, a fully saturated color has no white or black added to it, while a desaturated color has some degree of white or black added to it.

The third property in HSB color mode is brightness, which represents the amount of light reflected by a color, also expressed as a percentage from 0% (black) to 100% (white). In HSB color mode, brightness is distinct from saturation, meaning that a color can be both highly saturated and highly bright (such as a bright, neon color), or highly desaturated and dark (such as a dark, muted color).

One advantage of using HSB color mode is that it can be more intuitive for many users, as it corresponds more closely to the way that people perceive and describe color. For example, when we talk about a "bright" or "dark" color, we're referring to the brightness property of the color, which is more directly represented in HSB color mode.

Overall, HSB color mode is a powerful tool for working with color, whether you're designing graphics, creating artwork, or building a website. By understanding how the three properties of hue, saturation, and brightness work together, you can create a virtually unlimited range of colors and achieve the desired visual effect.

# RGB Color Mode
RGB color mode is a way of representing colors on digital devices such as computer monitors, televisions, and mobile devices. RGB stands for Red, Green, and Blue, the primary colors of light that are combined to create other colors in this mode.

In RGB color mode, each color is represented by a combination of three values that represent the intensity of red, green, and blue light required to create the color. These values are typically expressed as numbers ranging from 0 to 255, where 0 represents no intensity and 255 represents full intensity.

RGB color mode is widely used in digital graphics, web design, and other digital applications. It is a powerful tool for creating a wide range of colors and achieving precise color matching, but it has some limitations, such as the fact that it may not accurately represent the colors of printed materials, which typically use a different color mode.

## Example

{{< p5-global-iframe id="breath" width="400" height="400" >}}
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
  img = loadImage("content/assets/image/howl's_casttle.jpeg");
  img2 = loadImage("content/assets/image/howl's_casttle.jpeg");
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
{{< /p5-global-iframe >}}

# References

hsl() - CSS: Cascading Style Sheets | MDN. (s.f.). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl

Bear, J. H. (2012, 24 de junio). Understanding the HSV Color Model. Lifewire. https://www.lifewire.com/what-is-hsv-in-design-1078068

Colors RGB and RGBA. (s.f.). W3Schools Online Web Tutorials. https://www.w3schools.com/colors/colors_rgb.asp


