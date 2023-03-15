---
weight: 1
---

# Terrain with Perlin Noise

Perlin Noise is used here to represent the "natural" change in incerted triangles in a plane

# Perlin Noise

Perlin Noise es un tipo de función de ruido procedimental, lo que significa que genera valores aleatorios de forma que parezcan naturales y orgánicos. Fue inventado por Ken Perlin en 1983 para su uso en gráficos por ordenador.

Perlin Noise genera una cuadrícula de valores, en la que cada punto de la cuadrícula tiene asignado un valor aleatorio. A continuación, estos valores se interpolan entre puntos vecinos para crear una distribución suave y continua de valores en toda la cuadrícula. El resultado es un conjunto de valores que parecen variar de forma natural y coherente.

## Example

{{< p5-global-iframe id="breath" width="600" height="600" >}}
let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;

let flying = 0;

let terrain = [];

//TerrainSpeed movement
let terrainSpeed = 0.1;

//Terrain Noise
let terrainNoise = 100;

//RGB options
let r = 100;
let g = 100;
let b = 100;

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

  //sliders
  let sliderRGB_red = createSlider(0, 250, 100);
  sliderRGB_red.input(updater);
  sliderRGB_red.position(10, 40);

  let sliderRGB_green = createSlider(0,250,100);
  sliderRGB_green.input(updateg);
  sliderRGB_green.position(10,60);

  let sliderRGB_blue = createSlider(0,250,100);
  sliderRGB_blue.input(updateb);
  sliderRGB_blue.position(10,80);

  let sliderTerrainSpeed = createSlider(0,10,5);
  sliderTerrainSpeed.input(updateTerrainSpeed);
  sliderTerrainSpeed.position(200,40);
  
  let sliderTerrainNoise = createSlider(0,300,100);
  sliderTerrainNoise.input(updateTerrainNoise);
  sliderTerrainNoise.position(380,40);
  

}

function draw() {
  /*
  textSize(32);
  textAlign(CENTER);
  textFont("Georgia");
  text("RGB: ", 10, 10);
  */
  
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


  background(0);
  translate(0, 50);
  rotateX(PI / 3);
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

}

//update sliders values
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
{{< /p5-global-iframe >}}

# References

K. Perlin, "An image synthesizer," in Proceedings of the 12th Annual Conference on Computer Graphics and Interactive Techniques, vol. 19, no. 3, 1985, pp. 287-296, doi: 10.1145/325165.325247.

The Coding Train. (2016, 4 de mayo). Coding Challenge 11: 3D Terrain Generation with Perlin Noise in Processing [Video]. YouTube. https://www.youtube.com/watch?v=IKB1hWWedMk


