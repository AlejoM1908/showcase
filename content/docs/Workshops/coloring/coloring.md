---
weight: 1
bookToc: false
---

# HSL Color Mode
HSL stands for Hue, Saturation, Lightness, and it's a color model used in digital devices to represent colors. It works by defining a color based on its hue, which is its position on the color wheel, its saturation, which is its intensity or purity, and its lightness, which is its brightness or darkness. In the HSL model, the hue value represents the color itself, while the saturation and lightness values determine how vivid and bright or dull and dark the color appears. The HSL model is particularly useful in design and image editing, as it allows users to easily adjust and manipulate colors based on their hue, saturation, and lightness values.

Overall HSL Color Mode is a powerful tool for working with color whether you are designing graphics, creating artwork or building a website. By understanding how the three properties hue, saturation and lightness relate to each other you can create an almost unlimited amount of colors and achieve the desired visual effect.

# HSB Color Mode
HSB stands for Hue, Saturation, and Brightness (or Value), and it defines color based on hue, saturation, and brightness, which is its overall lightness or darkness. In the HSB model, the brightness value determines how much white or black is mixed with the hue and saturation, making it useful for color manipulation and adjustment.

An advantage of using HSB Color Mode is that it can be more intuitive for many users as it corresponds more closely to the way people perceive and describe color. For example, when we speak of a "bright" or "dark" color, we refer to the brightness of the color that is most directly represented in HSB Color Mode.

HSL is primarily used for color selection and design, while HSB is primarily used for color manipulation and adjustment.

# RGB Color Mode
RGB stands for Red, Green, Blue, and it's a color model used in digital devices to represent colors. It works by combining different levels of red, green, and blue light to produce a wide range of colors. In the RGB model, the absence of all colors is represented as black, while the presence of all colors at full intensity is represented as white. The RGB model is widely used in digital imaging, computer graphics, and display technologies, such as computer monitors, televisions, and projectors.

RGB Color Mode is widely used in digital design, web design and other digital applications. It is a powerful tool for creating a wide range of colors and achieving accurate color matching, but it has its limitations such as the fact that it may not accurately represent the colors of printed materials that usually use a different color mode.

## Example

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/coloring.js" width="500" height="480" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

## Code explanation

Here you'll have the step by step of the most important parts of the code development 

{{< details "Code">}}
{{< \tabs >}}
{{< tab "Invert original color" >}}
```js
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
```
Here we take an image and get the color of each pixel, that color is in RGB color mode, so if we want to get the inverse color of the original image we just have to make a take out, so we take out 255 that is the max value of every channel of RGB to the real value of that channel, last we set the new color of the pixels to a new image
{{< /tab >}}

{{< tab "Change To HSL colorMode" >}}
```js
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
```

Here we have to convert the RGB colorMode to HSL colorMode, we used some mathematic formulation to get a near aproximation, when we get an equivalent of the original RGB values, we just asign that values in  HSL to a new image to change the color of each pixel
{{< /tab >}}

{{< tab "Adding Color and speed, noise change" >}}
```js
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
```

Here we have to convert the RGB colorMode to HSV colorMode, we used some mathematic formulation to get a near aproximation, when we get an equivalent of the original RGB values, we just asign that values in  HSV to a new image to change the color of each pixel

{{< /tab >}}
{{< /tabs >}}
{{< /details >}}


# Coloring a sphere with HSB color model

The following example shows how to color a sphere using the HSB color model. The HSB color model is a way of representing colors in terms of three properties: hue, saturation and brightness. The HSB Color Mode is based on the concept of the color wheel, where colors are arranged in a circle according to their hue. Hue is measured in degrees, with red at 0°, green at 120° and blue at 240° and all other hues arranged between the three primary colors.

## Example

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/color_sphere.js" width="600" height="600" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

# References

Bear, J. H. (2012, 24 de junio). Understanding the HSV Color Model. Lifewire. https://www.lifewire.com/what-is-hsv-in-design-1078068

hsl() - CSS: Cascading Style Sheets | MDN. (s.f.). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl

Bear, J. H. (2012, 24 de junio). Understanding the HSV Color Model. Lifewire. https://www.lifewire.com/what-is-hsv-in-design-1078068

Colors RGB and RGBA. (s.f.). W3Schools Online Web Tutorials. https://www.w3schools.com/colors/colors_rgb.asp

Contributors to Wikimedia projects. "HSL and HSV - Wikipedia". Wikipedia, the free encyclopedia. https://en.wikipedia.org/wiki/HSL_and_HSV 


