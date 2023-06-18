# Post Effects

{{< details "Special Keys">}}
| Key              | Description        |
| ---------------- | ------------------ |
| 1                | Black and white    |
| 2                | Blur               |
| 3                | Hight contrast     |
| 4                | Sepia Effect       |
| 5                | Viggneta Effect    |
{{< /details >}}
{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/post_effects.js" width="600" height="880" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}
Post-effect refers to any modifications or enhancements applied to an image after it has been captured or rendered. These effects are typically applied using image editing software or tools.

Post-effects can be used to alter the overall appearance of an image, enhance certain aspects, or create specific artistic or stylistic effects. They allow photographers and designers to add creative touches, adjust colors, tones, contrast, or apply various filters and effects to achieve the desired look.

## Black and White

The black and white filter works by converting a color image into a grayscale image, which means that each pixel in the resulting image will have a single intensity value representing the shade of gray.

The grayscale values range from 0 (black) to 255 (white), representing the different shades of gray.
The resulting image can be displayed or saved for further use. By removing the color information and representing the image in shades of gray, the black and white filter can highlight the tonal values, textures, and overall composition of the image.
```javascript

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // get original color
  vec4 color = texture2D(tex0, vTexCoord);
  
  // RGB media
  float gray = (color.r + color.g + color.b) / 3.0;
  
  //rendering
  gl_FragColor = vec4(gray, gray, gray, color.a);
}

```
This code is a fragment shader that converts a texture to grayscale. It takes an input texture (tex0), samples the color of each fragment, and calculates the average of the red, green, and blue components. This average value represents the intensity of the grayscale color. The shader then sets the output color of the fragment (gl_FragColor) to a grayscale version of the input color, with the alpha component unchanged

## Blur 
The blur effect, also known as Gaussian blur, is a common image filtering technique used to reduce image noise and create a smoother appearance by averaging the pixel values within a neighborhood. The blur effect helps to reduce high-frequency noise and remove fine details, resulting in a softer appearance. The amount of blur can be controlled by adjusting the kernel size or the standard deviation of the Gaussian distribution.

```javascript

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform vec2 texSize;
varying vec2 vTexCoord;

const float blurSize = 2.0; // blur size
const int numSamples = 9; // near colors

void main() {
  // Coords
  vec2 uv = vTexCoord * texSize;
  
  // near color media
  vec4 sum = vec4(0.0);
  for (int i = -numSamples; i <= numSamples; i++) {
    for (int j = -numSamples; j <= numSamples; j++) {
      sum += texture2D(tex0, (uv + vec2(i, j) * blurSize) / texSize);
    }
  }
  sum /= float((2 * numSamples + 1) * (2 * numSamples + 1));
  
  // rendering
  gl_FragColor = sum;
}

```
applies a box blur effect to a texture. It takes an input texture (tex0) and calculates the average color of neighboring pixels by sampling the texture multiple times. The size of the blur effect and the number of neighboring pixels to consider can be adjusted. The resulting average color is then assigned to the output color of the fragment (gl_FragColor)


## Hight contrast

Contrast refers to the difference in brightness or color between the light and dark areas of an image. The contrast filter adjusts the range of tones in an image to make it appear more vibrant or dynamic. Increasing the contrast makes the bright areas of the image appear brighter and the dark areas appear darker, enhancing the overall separation between light and dark elements. This can make the image look more vivid and visually appealing.

Decreasing the contrast reduces the difference between light and dark areas, resulting in a flatter and less vibrant image.

It's important to note that extreme adjustments to contrast may lead to loss of detail or overexposure in bright areas or underexposure in dark areas. Therefore, it's often desirable to apply contrast adjustments in moderation, keeping the overall visual balance in mind.

```javascript

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform vec2 texSize;
varying vec2 vTexCoord;

const float blurSize = 2.0; // blur size
const int numSamples = 9; // near colors

void main() {
  // Coords
  vec2 uv = vTexCoord * texSize;
  
  // near color media
  vec4 sum = vec4(0.0);
  for (int i = -numSamples; i <= numSamples; i++) {
    for (int j = -numSamples; j <= numSamples; j++) {
      sum += texture2D(tex0, (uv + vec2(i, j) * blurSize) / texSize);
    }
  }
  sum /= float((2 * numSamples + 1) * (2 * numSamples + 1));
  
  // rendering
  gl_FragColor = sum;
}

```

adjusts the contrast of a texture. It takes an input texture (tex0), samples the color of each fragment, and applies a contrast adjustment to the RGB components. The contrast value is a scalar that determines the strength of the adjustment. The adjusted color is then assigned to the output color of the fragment (gl_FragColor).

## Sepia

The sepia effect is a popular image filter that gives photos a warm, nostalgic, and vintage look, reminiscent of old photographs. It transforms a color image into a monochrome image with a brownish tone.The sepia effect mimics the look of older photographs, which were often tinted with brownish hues due to the aging of the photo paper and chemical processes used in the past.

```javascript

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // original color
  vec4 color = texture2D(tex0, vTexCoord);
  
  // sepia filter
  vec3 sepiaColor;
  sepiaColor.r = (color.r * 0.393) + (color.g * 0.769) + (color.b * 0.189);
  sepiaColor.g = (color.r * 0.349) + (color.g * 0.686) + (color.b * 0.168);
  sepiaColor.b = (color.r * 0.272) + (color.g * 0.534) + (color.b * 0.131);
  
  // render
  gl_FragColor = vec4(sepiaColor, color.a);
}

```

applies a sepia filter to a texture. It takes an input texture (tex0), samples the color of each fragment, and transforms the RGB components to achieve a sepia effect. The transformed color is then assigned to the output color of the fragment (gl_FragColor)

## Viggneta 

The vignette effect is a popular image filter that darkens or fades the edges of an image, creating a gradual transition towards the center. This effect draws attention to the central subject of the image and can create a more dramatic or vintage look. The vignette effect gradually darkens or fades the edges of the image, drawing the viewer's focus towards the center. This can help create a more focused and dramatic composition or add a vintage aesthetic to the image.

```javascript
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform vec2 texSize;
varying vec2 vTexCoord;

void main() {
  
  vec2 uv = vTexCoord * texSize;
  
  // distance to the center
  float dist = distance(uv, vec2(0.5));
  
  // smoothstep
  float vignette = smoothstep(0.6, 0.9, dist);
  
  // original color
  vec4 color = texture2D(tex0, vTexCoord);
  
  
  color.rgb *= vignette;
  
  // render
  gl_FragColor = color;
}

```

vignette effect to a texture by calculating the distance from each pixel to the center of the texture and applying a smooth transition using the smoothstep function. The original color is then multiplied by the vignette value, resulting in a darkening effect towards the edges of the image.


## Live video with Post Effects
{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/postvideo.js" width="500" height="480" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}


## Conclution
- Post-effects are an important aspect of computer graphics and image processing as they allow for the enhancement, modification, or stylization of rendered images or video footage after the primary rendering process. Post-effects play a crucial role in the final presentation and manipulation of rendered images or video, offering a range of possibilities to enhance visual quality, artistic expression, and optimization in computer graphics and image processing workflows.
- Post effects allow artists and developers to manipulate the overall mood and atmosphere of a scene. By adjusting color, contrast, saturation, and other parameters, post effects can evoke different emotions and enhance the storytelling or thematic elements of a project. For example, desaturation and increased contrast can create a gritty and dark atmosphere, while soft lighting and warm colors can convey a sense of tranquility or nostalgia.
- Post effects can also serve practical purposes in optimizing performance. Techniques such as anti-aliasing, screen space reflections, and level-of-detail adjustments can help balance visual quality with rendering performance. By selectively applying post effects to specific parts of the rendered image or reducing the complexity of certain effects, developers can achieve a good balance between visual fidelity and performance requirements.

# References

- "GLSL Cubic Lens Distortion". //game dev log of martins upitis. http://devlog-martinsh.blogspot.com/2011/10/glsl-cubic-lens-distortion.html.
- "Pseudo Lens Flare". john-chapman-graphics. http://john-chapman-graphics.blogspot.com/2013/02/pseudo-lens-flare.html.
- Contributors to Wikimedia projects. "Box blur - Wikipedia". Wikipedia, the free encyclopedia. https://en.wikipedia.org/wiki/Box_blur .
