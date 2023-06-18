# Procedural texturing
Procedural texturing is a technique used in computer graphics to generate textures algorithmically, rather than relying on traditional image-based textures. It involves creating textures using mathematical functions, patterns, or algorithms to define the visual appearance of a surface.

![Bricks](/showcase/assets/image/brick.jpg)

as we can see at [The book of shaders](https://thebookofshaders.com/09/)  we can create patterns and visualized it in a surface 

we find that truchet shader created by [patriciogv](https:patriciogonzalezvivo.com) could be use for map a sphere all credits to the author

{{< p5-global-iframe id="test" width="400" height="400" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcase/sketches/shaders/brick.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  sphere(100, 200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

{{< /p5-global-iframe >}}


```javascript
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

vec2 brick(vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st); 
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    // st /= vec2(2.15,0.65)/1.5;

    // Apply the brick tiling
    st = brickTile(st,5.0);
  
    st = brick(st,u_zoom);
    color = vec3(box(st,vec2(0.9)));

    // Uncomment to see the space coordinates
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
```
In summary we can see that this shader generates a brick pattern on the screen using procedural techniques. It applies brick tiling and creates individual bricks with rectangular shapes. The resulting pattern is then rendered as a series of bricks on the screen. The zoom level of the pattern can be controlled with the u_zoom variable.

## examples
{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/cylinderA.js" width="500" height="480" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

```javascript
#ifdef GL_ES
  precision mediump float;
  #endif
  
  varying vec2 vTexCoord;
  uniform float u_xoff;
  uniform float u_yoff;
  
  void main() {
    // tex coord
    vec2 st = vTexCoord;
    
    // movement
    st += vec2(u_xoff, u_yoff);
    
    // pattern
    float pattern = step(fract(st.x * 8.0), 0.5) * step(fract(st.y * 8.0), 0.5);
    
    
    gl_FragColor = vec4(pattern, pattern, pattern, 1.0);
  }
```

Here we generates a moving checkerboard pattern based on the input texture coordinates. The pattern is created by dividing the texture space into a grid of squares and applying step functions to determine the presence of the pattern in each square. The resulting pattern is then rendered as grayscale. The movement of the pattern is controlled by the x and y offsets provided as uniforms.

Also we can map other 3D shapes with images, you can move the sphere with your mouse

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/sphereImage.js" width="600" height="600" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

```javascript
precision mediump float;

  varying vec2 vTexCoord;

  uniform sampler2D uTexture;

  void main() {
    vec3 dir = vec3(vTexCoord - 0.5, 1.0);
    float len = length(dir);
    dir = normalize(dir);
    float u = acos(dir.y) / 3.14159265358979323846;
    float v = (atan(dir.z, dir.x) / 3.14159265358979323846 + 1.0) * 0.5;
    gl_FragColor = texture2D(uTexture, vec2(u, v));
  }
```

shader applies spherical texture mapping to a 3D scene. It maps the direction vector from the center of the texture to each fragment onto spherical coordinates (u and v), and uses these coordinates to sample the color from a given texture. The resulting color is then assigned to the output color of the fragment.


## Conclutions
-  Procedural textures allow for dynamic and customizable textures that can be adjusted in real-time. By using mathematical functions and algorithms, procedural texturing provides a high degree of control over the appearance of the texture, such as color, patterns, and variations.
- Procedural textures can seamlessly tile across large surfaces without visible seams or repetition. This makes them well-suited for creating patterns and textures that need to be repeated across a 3D model or a terrain surface.
- Procedural texturing is often used in conjunction with procedural modeling techniques to create complex and realistic environments. By combining procedural textures with procedural geometry generation, it becomes possible to create intricate and detailed scenes without the need for manual modeling or extensive texture mapping.

# References 
- patriciogv. "The Book of Shaders". The Book of Shaders. https://thebookofshaders.com/09/ .
- "Texture Analysis and Synthesis". Computer Graphics at Stanford University. https://graphics.stanford.edu/projects/texture/ .
- Contributors to Wikimedia projects. "Procedural texture - Wikipedia". Wikipedia, the free encyclopedia. https://en.wikipedia.org/wiki/Procedural_texture.