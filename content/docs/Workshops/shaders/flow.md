---
weight: 1
bookToc: false
---

## Flow field art
Flow art is a captivating form of artistic expression that explores the beauty of fluidity and movement, it embraces the dynamic nature of flowing substances, such as paint, ink, or other viscous materials, to create mesmerizing patterns and compositions; The process involves pouring or manipulating the fluid medium onto a surface, allowing it to move and spread organically. The interplay of gravity, surface tension, and the artist's guidance gives rise to a symphony of shapes, colors, and textures pleasing to the observer.

One of the most captivating aspects of flow art is its unpredictability, as the liquid medium flows and mixes, it forms intricate and unique patterns that cannot be replicated. The artist observes and interacts with the evolving composition, making intuitive decisions to guide the flow or introduce additional elements. In this implementation particularly we are using a flow field to guide the flow a set of particles, the flow field is a 2D grid of vectors that are used to determine the direction of the particles that change with the time and so genrate different compositions, the particles so left a fading trail where they move, leaving a unique composition where the movement can easily be seen.

## Perlin noise
Perlin noise is a procedural noise function that generates a smooth and continuous random pattern, developed by Ken Perlin in the 1980s and has since become widely used in computer graphics and simulations, particularly useful for creating natural-looking textures, terrain, and smooth animations. At its core, Perlin noise is a mathematical algorithm that generates a grid of random gradient vectors. These gradient vectors are assigned to each integer coordinate point in the grid, and when given a floating-point coordinate within the grid, Perlin noise interpolates between the surrounding gradient vectors to produce a smooth value at that point.

<img src="/showcase/assets/image/perlin_noise.jpeg" alt="Convolution Example" style="height: 300px; width:600px; margin: 30px auto; display: block;"/>

{{< details "Special Keys">}}
| Key              | Description        |
| ---------------- | ------------------ |
| F                | See the flow field |
{{< /details >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/flow_field.js" width="600" height="600" marginWidth="0" marginHeight="0" scrolling="no">}}

### Code explanation
The code consists of multiple processes that work at the same time generating the final composition. The first process is the generation of the flow field, this is done by generating a grid of vectors that are used to determine the direction of the particles and then drawing the vectors on the canvas using a dedicated shader for this process. The second process is the generation of the particles, this is done by generating a set of particles that move on the canvas following the direction of the vectors of the flow field, the particles are drawn on the canvas using a dedicated shader for this process. The third process is the generation of the trails, this is done by slowlly reducing the alpha channel in the background after each frame already painted the particles shader.

{{< tabs "uniqueid" >}}
{{< tab "Flow Field vertex" >}}
```javascript
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
  vTexCoord = aTexCoord;
}
```
{{< /tab >}}
{{< tab "Flow Field fragment" >}}
```javascript
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_time;
uniform int u_showField;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 uv = (st - 0.5) * u_scale;
  
  vec3 color = vec3(0.0);
  
  if (u_showField == 1) {
    vec2 flow = vec2(
      cos(uv.x + u_time * 0.1),
      sin(uv.y + u_time * 0.1)
    );
    
    float magnitude = length(flow);
    color = vec3(magnitude);
  }
  
  gl_FragColor = vec4(color, 1.0);
}
``` 
{{< /tab >}}
{{< /tabs >}}

{{< tabs "uniqueid" >}}
{{< tab "Particles vertex" >}}
```javascript
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
  vTexCoord = aTexCoord;
}
```
{{< /tab >}}
{{< tab "Particles fragment" >}}
```javascript
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_pos;
uniform vec2 u_prevPos;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
  vec2 pos = (u_pos + 1.0) * 0.5;
  vec2 prevPos = (u_prevPos + 1.0) * 0.5;
  
  vec2 direction = normalize(pos - prevPos);
  
  float intensity = smoothstep(0.0, 0.1, distance(st, pos));
  
  gl_FragColor = vec4(vec3(intensity), 1.0);
}
``` 
{{< /tab >}}
{{< /tabs >}}

{{< tabs "uniqueid" >}}
{{< tab "Flow field generation" >}}
```javascript
function initializeFlowField() {
    flowfield = createGraphics(cols, rows, WEBGL);
    flowfield.noStroke();
    flowfield.shader(flowFieldShader);

    flowFieldShader.setUniform('scale', scale);
    flowFieldShader.setUniform('cols', cols);
    flowFieldShader.setUniform('rows', rows);
}

function drawFlowField() {
    flowfield.shader(flowFieldShader);
    flowFieldShader.setUniform('time', frameCount * 0.1);
    flowfield.rect(-width / 2, -height / 2, width, height);
}

function updateFlowField() {
    flowfield.shader(flowFieldShader);
    flowFieldShader.setUniform('time', frameCount * 0.1);
    flowFieldShader.setUniform('update', true);
    flowfield.rect(-width / 2, -height / 2, width, height);
    flowFieldShader.setUniform('update', false);
}
```
{{< /tab >}}
{{< tab "Particles generation" >}}
```javascript
function initializeParticles() {
    particleVAO = createGraphics(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
    particleVAO.noStroke();
    particleVAO.shader(particleShader);
    particleShader.setUniform('texture', particleTexture);

    for (let i = 0; i < numParticles; i++) {
        particles[i] = createVector(random(CANVAS_SIZE), random(CANVAS_SIZE));
    }
}

function updateParticles() {
    particleVAO.shader(particleShader);
    particleShader.setUniform('time', frameCount * 0.1);

    particleVAO.beginShape(POINTS);
    for (let i = 0; i < numParticles; i++) {
        let p = particles[i];
        particleShader.setUniform('position', [p.x, p.y]);
        particleVAO.vertex(p.x, p.y);
    }
    particleVAO.endShape();

    particleShader.setUniform('update', true);
    particleVAO.beginShape(POINTS);
    for (let i = 0; i < numParticles; i++) {
        let p = particles[i];
        let dx = map(noise(p.x * increment, p.y * increment, zoff), 0, 1, -1, 1);
        let dy = map(noise(p.x * increment, p.y * increment, zoff + 100), 0, 1, -1, 1);
        p.add(createVector(dx, dy).mult(2));
        p.x = constrain(p.x, 0, CANVAS_SIZE);
        p.y = constrain(p.y, 0, CANVAS_SIZE);
        particleShader.setUniform('position', [p.x, p.y]);
        particleVAO.vertex(p.x, p.y);
    }
    particleVAO.endShape();
    particleShader.setUniform('update', false);

    zoff += incStart;
}
```
{{< /tab >}}
{{< /tabs >}}

## References

- [Chris Courses](https://youtu.be/na7LuZsW2UM) => Video inspiration and idea
- [Khan Academy](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-noise/a/perlin-noise) => undestanding Perlin Noise
- [Chat GPT](https://chat.openai.com/) => text generation and logic explanation