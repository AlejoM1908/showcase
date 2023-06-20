---
weight: 1
bookToc: false
---
## Glitching writting
The glitching effect is a very popular effect in the digital art world. It is a very simple effect to achieve and it can be used in many different ways. In this workshop we will learn how to create a glitching effect on a text using a shader.

### The shader
The shader we will use is a very simple shader that will take a drawing and will apply a glitching effect to it. The shader is composed of two parts, the first part is the vertex shader and the second part is the fragment shader. The vertex shader is the part of the shader that will be executed for each vertex of the drawing and the fragment shader is the part of the shader that will be executed for each pixel of the drawing.

To generate this efect we will split the drawing in the three color channels (red, green and blue) and paint three drawings with each one, one of them will be static while the other two move in different directions in a small proportion generating a glitching effect on the drawing. To make it more interesting we will also add a noise effect to the movement of the moving drawings so the movement is not linear and can be timed diferently.

{{< details "Special Keys">}}
| Key              | Description        |
| ---------------- | ------------------ |
| R                | Reset the canvas   |
{{< /details >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/glitch_text.js" width="600" height="600" marginWidth="0" marginHeight="0" scrolling="no">}}

### Code explanation
The code of the shader is very simple, the vertex and fragment shaders are generated in different files and then imported to the WEBGL context. This are the shader files:

{{< tabs "uniqueid" >}}
{{< tab "Vertex Shader" >}}
```js
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
    vTexCoord = aTexCoord;

    vec4 position = vec4(aPosition, 1.0);
    position.xy = position.xy * 2.0 - 1.0;

    gl_Position = position;
}
```
{{< /tab >}}
{{< tab "Fragment Shader" >}}
```js
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform float movement;

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;

    vec2 offset = vec2(movement * 0.03, -movement * 0.02);

    vec3 color;
    color.r = texture2D(texture, uv + offset).r;
    color.g = texture2D(texture, uv).g;
    color.b = texture2D(texture, uv - offset).b;

    gl_FragColor = vec4(color, 1.0);
}
```
{{< /tab >}}
{{< /tabs >}}

The main logic is that while the user presses the mouse left button the program will start painting over the canvas, then the whole canvas will be painted with the shader and the shader will be executed for each pixel of the canvas. The shader will take the color of the pixel and will paint it in ech channel with a given offset. The offset will be calculated using the movement value and a random value from the elapsed execution time as this:

{{< tabs "uniqueid" >}}
{{< tab "Main loop" >}}
```js
function draw() {
    if (mouseIsPressed) {
        draw_canvas.line(mouseX, mouseY, pmouseX, pmouseY);
    }

    if (reset_draw) {
        draw_canvas.background(40);
        reset_draw = false;
    }

    showGlitch();
}
```
{{< /tab >}}
{{< tab "Show Glitch" >}}
```js
function showGlitch() {
    glitch_shader.setUniform('texture', draw_canvas);
    glitch_shader.setUniform('movement', generateRandomMovement());

    rect(-width/2, -height/2, width, height);
}
```
{{< /tab >}}
{{< tab "Generate Random Movement" >}}
```js
const MOVEMENT = 0.1;

function generateRandomMovement() {
    let glitch_noise = noise(millis() / 100);

    if (glitch_noise < MOVEMENT) {
        return 0;
    }

    glitch_noise = pow((glitch_noise - MOVEMENT) * 1/(1 - MOVEMENT), 2);

    return glitch_noise;
}
```
{{< /tab >}}
{{< /tabs >}}