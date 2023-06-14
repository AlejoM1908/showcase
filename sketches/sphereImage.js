let sphereShader;
let textureImg;

let angX = 0;
let angY = 0;

function preload() {
  sphereShader = loadShader('shader.vert', 'shader.frag');
  textureImg = loadImage('sky.jpg');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL); // Asegurarse de que las coordenadas de textura sean de 0 a 1
}

function mouseDragged() {
  angX = map(mouseX, 0 , width, 0 , PI);
  angY = map(mouseY, 0 , height, 0 , PI);
}

function draw() {
  background(0);
  rotateY(angX);
  rotateX(angY);
  
  shader(sphereShader);
  sphereShader.setUniform('uTexture', textureImg); // Pasar la textura al shader
  
  // Crear una esfera con un radio de 100 y 64 segmentos
  sphere(200, 100, 100);
  
  
}