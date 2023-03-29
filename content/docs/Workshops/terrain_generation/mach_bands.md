---
weight: 1
bookToc: false
---

# Terrain with Perlin Noise

Perlin Noise is used here to represent the "natural" change in incerted triangles in a plane

# Perlin Noise

Perlin Noise is a type of procedural noise function, meaning that it generates random values in a way that looks natural and organic. It was invented by Ken Perlin in 1983 for use in computer graphics.

Perlin Noise generates a grid of values, where each grid point is assigned a random value. These values are then interpolated between neighboring points to create a smooth, continuous distribution of values across the grid. The result is a set of values that appear to vary naturally and consistently.


It is frequently used in video games to make procedurally generated terrain that looks natural; In a game or simulation, you might want to generate a large terrain with mountains, valleys, and other features that appear natural and realistic. One way to do this is to use Perlin noise to generate a height map, which is a grayscale image where each pixel represents the height of the terrain at that point.

To generate the height map, you would start by creating a grid of random vectors, as I mentioned earlier. You would then use a function to interpolate between these vectors, creating a smooth gradient field. Finally, you would sample this gradient field at regular intervals to create a grid of height values.

The result would be a height map that you could use to create the terrain. For example, you could use the height values to place objects like rocks and trees on the terrain, or to calculate the flow of water and other fluids.

![imagen Terreno Generado con Perlin noise](/showcase/assets/image/Fractal_terrain_texture.jpg)

## Example

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/terrain_generator.js" width="600" height="600" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

### Code explanation

{{< details "Code">}}
{{< \tabs >}}
{{< tab "Creating the core of the example" >}}
```js
function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; 
    }
  }
}
```
Here we have one of the mos important things that you have to do; a matrix, with this matrix you'll be able to modify every point position according whit the perlin noise and the map function

{{< /tab >}}
{{< tab "Creating the "Perlin Noise effect" >}}
```js
function draw() {
  flying -= terrainSpeed;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -terrainNoise, terrainNoise);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

}
```
Here we use the terrain matrix to set a specific position using the perling noise, also here is where we modify the change of the terrain movement and the noise

{{< /tab >}}
{{< tab "Creating the Triangles" >}}
```js
fill(r,g,b);
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
```

Here we create the Triangles that will be the surface of the terrain, we set the position of the vertex according to some coordinates and the terrain matrix 

{{< /tab >}}
{{< tab "Adding Color and speed, noise change" >}}
```js
function updater(){
    r = this.value();
}

function updateg(){
    g = this.value();
}

function updateb(){
    b = this.value();
}

function updateTerrainSpeed(){
    terrainSpeed = this.value()/10;
}

function updateTerrainNoise(){
    terrainNoise = this.value();
}
```

here we create 5 sliders that allow us to interact with the terrain, we have:
-One for R, RGB channel 
-One for G, RGB channel
-One for B, RGB channel
-One for Speed change of the terrain surface
-One for Noise change if the terrain surface
{{< /tab >}}
{{< /tabs >}}
{{< /details >}}
#### References

K. Perlin, "An image synthesizer," in Proceedings of the 12th Annual Conference on Computer Graphics and Interactive Techniques, vol. 19, no. 3, 1985, pp. 287-296, doi: 10.1145/325165.325247.

The Coding Train. (2016, 4 de mayo). Coding Challenge 11: 3D Terrain Generation with Perlin Noise in Processing [Video]. YouTube. https://www.youtube.com/watch?v=IKB1hWWedMk
