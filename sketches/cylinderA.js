let bookShader;
let xoff = 0.0;
let yoff = 0.0;

function preload() {
  bookShader = loadShader('/showcase/sketches/shaders/cylinderA.vert', '/showcase/sketches/shaders/cylinderA.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  shader(bookShader);
}

function draw() {
  background(0);
  
  // Incrementa los desplazamientos xoff y yoff
  xoff += 0.01;
  yoff += 0.01;
  
  // Pasa los desplazamientos al shader
  bookShader.setUniform('u_xoff', xoff);
  bookShader.setUniform('u_yoff', yoff);
  
  rotateY(frameCount * 0.01);
  cylinder(100, 200);
}
