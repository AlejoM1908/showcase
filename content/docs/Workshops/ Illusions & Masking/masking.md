---
weight: 1
bookToc: false
---
## Images Masking
Kernel masking, also known as convolution masking, is a technique used in image processing to apply a specific filter or kernel to an image. This technique involves sliding a small matrix, known as a kernel or filter, over the entire image and performing a mathematical operation at each pixel location. The resulting output image is a new image that has been transformed based on the filter's characteristics.

The kernel or filter used in convolution masking is a small matrix typically containing odd numbers of rows and columns, such as 3x3, 5x5, or 7x7. The elements of the kernel represent the weights assigned to each pixel in the image. The weights determine how much influence the pixel has on the resulting image after the kernel is applied.

The mathematical operation performed at each pixel location involves multiplying the values of the kernel by the corresponding pixel values in the image. The resulting products are summed, and the final result is assigned to the corresponding pixel location in the output image. This process is repeated for every pixel in the image, resulting in a new transformed image.

Kernel masking is a powerful technique used in various image processing tasks, such as image smoothing, sharpening, edge detection, and feature extraction. The choice of kernel used depends on the specific image processing task at hand. For example, a Gaussian filter kernel is commonly used for image smoothing, while a Sobel filter kernel is used for edge detection.


{{< hint info >}}
**Masking Example -** Operation of a sharpen 3x3 masking being applied to an image:
<img src="/showcase/assets/video/convolution_example.gif" alt="Convolution Example" style="height: 300px; width:600px; margin: 30px auto; display: block;"/>
{{< /hint >}}

## Histograms
A histogram is a graph that shows the frequency of occurrence of each intensity value in the image. By analyzing the histogram of an image, we can gain insights into the image's characteristics, such as its brightness, contrast, and color balance. Histograms are widely used in various fields, such as photography, computer vision, and machine learning.

In image processing, a histogram is a function that counts the number of pixels in an image that have a particular intensity value. The horizontal axis of the histogram represents the intensity values, and the vertical axis represents the number of pixels with that intensity value.

Histograms can be calculated for each channel of an RGB image, representing the red, green, and blue color channels. This allows us to analyze the distribution of pixel values in each channel independently. We can also calculate a combined histogram that represents the distribution of pixel values across all three channels.

Histogram equalization is a technique used to adjust the distribution of pixel values in an image to improve its visual quality. This technique involves stretching the histogram to make the intensity values more evenly distributed. This can improve the image's contrast and brightness and make it more visually appealing.

{{< hint info >}}
**Histogram Example -** Example of two histograms over a masked image:
<img src="/showcase/assets/image/histogram.png" alt="Histogram Example" style="height: 300px; width:400px; margin: 30px auto; display: block;"/>
{{< /hint >}}

## Brightness control
Brightness control is another important technique in image processing that can be used to adjust the overall brightness of an image. By increasing or decreasing the brightness, we can make an image appear lighter or darker, respectively. This can be useful for correcting underexposed or overexposed images, or for enhancing the visibility of certain features.

Brightness control is typically performed by adding a constant value to each pixel in the image. This constant value is known as the brightness adjustment factor. The brightness adjustment factor can be positive or negative, depending on whether we want to increase or decrease the brightness of the image. The larger the value of the brightness adjustment factor, the more pronounced the effect of the brightness control.

Another way to implement such technique is by using other colors modes, such as HSB or HSL. In these color modes, the brightness of a color is represented by the brightness component, which is a value between 0 and 100. By increasing or decreasing the brightness component, we can increase or decrease the brightness of the color, respectively. This can be useful for adjusting the brightness of an image without having to change the color of the pixels, but by using this technique, we lose the ability to control the color of the pixels independently, wich can lead to undesirable results.

{{< details "Special Keys">}}
| Key              | Description        |
| ---------------- | ------------------ |
| F                | Change mask        |
| G                | Show histogram     |
| H                | Change image       |
| J                | Change Histogram   |
| K                | Change mask mode   |
| V                | Decrease brightness|
| B                | Increase brightness|
| R                | Reset image        |
{{< /details >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/masking.js" width="600" height="880" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

## Code Explanation

### Masking
The program has a set of kernels and images that will be preloaded, those sets are gona be used to reset the image and to change the mask, so the image being modified is in another variable so it can be modified as much as wanted without affecting the original image, the kernels are 3x3 matrices that are used to modify the image, the kernel is applied to the image by multiplying each pixel of the image by the corresponding pixel of the kernel, the result of the multiplication is added to the rest of the results of the multiplication of the other pixels, and the result is assigned to the pixel that is being modified, this process is repeated for every pixel in the image, resulting in a new transformed image.

{{< details "Image convolution">}}
```js
function convolveImage(image) {
  for (let posX = 1; posX < image.width - 1; posX++) {
      for (let posY = 1; posY < image.height - 1; posY++) {
          let operatedPixel = getConvolution(image, posX, posY);
          let position = (posX + posY * image.width) * 4;

          image.pixels[position] = operatedPixel.r;
          image.pixels[position + 1] = operatedPixel.g;
          image.pixels[position + 2] = operatedPixel.b;
          image.pixels[position + 3] = 255;
      }
  }

  stroke(300, 100, 80);
  image.updatePixels();
}
```
{{< /details >}}

### Histogram
The histogram is a graph that shows the frequency of occurrence of each intensity value in the image, the histogram is calculated by counting the number of pixels in an image that have a particular intensity value, the horizontal axis of the histogram represents the intensity values, and the vertical axis represents the number of pixels with that intensity value, the histogram is calculated by counting the number of pixels in an image that have a particular intensity value, the horizontal axis of the histogram represents the intensity values, and the vertical axis represents the number of pixels with that intensity value.

{{< details "Histogram calculation and equalization">}}
```js
function calculateHistograms() {
  histograms = [];

  // Init the histograms array
  for (let i = 0; i < 4; i++) {
    histograms.push(new Array(256).fill(0));
  }

  // Calculate the histogram for the three color channels and the average
  for (let i = 0; i < masking_canvas.width; i++) {
    for (let j = 0; j < masking_canvas.height; j++) {
      // Get the color channels
      let channels = getPixel(i, j);

      // Calculate the average
      let avg = (channels[0] + channels[1] + channels[2]) / 3;

      histograms[0][avg]++;
      histograms[1][channels[0]]++;
      histograms[2][channels[1]]++;
      histograms[3][channels[2]]++;
    }
  }

  // Scale down the histograms to fit the histogram canvas
  scaleDownHistograms();
}

function scaleDownHistograms() {
  // Iterate over the histograms and scale them down
  for (let i = 0; i < histograms.length; i++) {
    let scale_factor = histogram_canvas.height / max(...histograms[i]);

    for (let j = 0; j < histograms[i].length; j++) {
      histograms[i][j] *= scale_factor;
    }
  }
}
```
{{< /details >}}

### Brightness control
Brightness control is another important technique in image processing that can be used to adjust the overall brightness of an image. By increasing or decreasing the brightness, we can make an image appear lighter or darker, respectively. This can be useful for correcting underexposed or overexposed images, or for enhancing the visibility of certain features.

In the implementation of this technique was done by adding a constant value to each pixel in the image. This constant value is known as the brightness adjustment factor. The brightness adjustment factor can be positive or negative, depending on whether we want to increase or decrease the brightness of the image. The larger the value of the brightness adjustment factor, the more pronounced the effect of the brightness control.

{{< details "Brightness control">}}
```js
function operateBrightness(value) {
  current_image.loadPixels();
  let [r, g, b] = [0, 0, 0];

  for (let i = 0; i < current_image.pixels.length; i += 4) {
    [r, g, b] = [current_image.pixels[i], current_image.pixels[i + 1], current_image.pixels[i + 2]];

    current_image.pixels[i] = constrain(r + value, 0, 255);
    current_image.pixels[i + 1] = constrain(g + value, 0, 255);
    current_image.pixels[i + 2] = constrain(b + value, 0, 255);
  }

  current_image.updatePixels();
}

function controlBrightness(increment = true) {
  if (increment) {
    operateBrightness(5);
  }
  else{
    operateBrightness(-5);
  }

  histogram_changed = true;
}
```
{{< /details >}}

### Interactivity
This was deffinetly the most challenging part of the project, the interactivity was implemented by using a series of flags that allows the interactivity of the 3 main features of the project, the masking, the histogram and the brightness control, the flags are set to true when the user clicks on the corresponding button, and the flags are set to false when the user clicks on the same button again, this way the user can toggle the feature on and off.

Other flags are only as a state machine to control when a certain component need to be updated (this was thone this way for optimization reasons), for example, the histogram is only calculated when the current selected image in changed in any way, and the changes to the image are calculated only once in the workflow.

{{< details "Interactivity">}}
```js
let show_histogram = true;
let histogram_changed = true;
let mask_changed = true;
let local_mode = false;

function draw() {
  background(52, 58, 64);

  if (mask_changed) {
    // Check to apply the mask locally or globally
    local_mode ? applyLocalMask() : applyGlobalMask();

    // Reset the flags
    mask_changed = false;
    histogram_changed = true;
  }
  
  // Histogram has a change, calculate the new histograms
  if (histogram_changed && show_histogram) {
    calculateHistograms();
    histogram_changed = false;
  }

  // load the selected image to the masking canvas
  masking_canvas.image(current_image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  displayName(mask_title, masking_canvas);
  image(masking_canvas, 0, 0);

  // Display the histogram if the flag is true
  if (show_histogram) drawHistogram();
}

function keyPressed() {
  switch (key) {
  case 'f':
      switchMask();
      break;
  case 'g':
      show_histogram = !show_histogram;
      histogram_changed = true;
      break;
  case 'h':
      switchImage();
      histogram_changed = true;
      break;
  case 'j':
      switchHistogram();
      break;
  case 'k':
      local_mode = !local_mode;
      clearMask();
      break;
  case 'v':
      controlBrightness();
      break;
  case 'b':
      controlBrightness(false);
      break;
  case 'r':
      clearMask();
      break;
  }
}
```
{{< /details >}}

## Final Thoughts
This masking thechnique is widely used in image processing, and it can be used to perform a variety of image processing tasks, such as image smoothing, sharpening, edge detection, and feature extraction. The choice of kernel used depends on the specific image processing task at hand. For example, a Gaussian filter kernel is commonly used for image smoothing, while a Sobel filter kernel is used for edge detection, more especifcally in the visual effects industry for copmposting and applying color corrections, the features extraction technique among complex IA models are capable of optimize the work that later on must be done by a human, and the histogram equalization is a technique used to adjust the distribution of pixel values in an image to improve its visual quality, this technique is used in profesional photography to improve the image's contrast and brightness and make it more visually appealing.

## References
- [Medium - Image processing with python](https://medium.com/swlh/image-processing-with-python-convolutional-filters-and-kernels-b9884d91a8fd)
- [Wikipedia - Histogram](https://en.wikipedia.org/wiki/Histogram)
- [Wikipedia - Histogram equalization](https://en.wikipedia.org/wiki/Histogram_equalization)
- [Wikipedia - Brightness](https://en.wikipedia.org/wiki/Brightness)
- [Wikipedia - Color model](https://en.wikipedia.org/wiki/Color_model)
- [Wikipedia - HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
- [IA - ChatGPT: Text generation only] (https://chat.openai.com/chat)