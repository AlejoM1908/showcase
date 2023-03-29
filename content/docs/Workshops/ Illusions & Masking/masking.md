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
