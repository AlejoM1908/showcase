let sphereShader;
let textureImg;

let angX = 0;
let angY = 0;

function preload() {
  sphereShader = loadShader('content/shaders/sphereImage.vert', 'content/shaders/sphereImage.frag');
  textureImg = loadImage('/showcase/assets/image/sky.jpg');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL); // normalize coords
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
  sphereShader.setUniform('uTexture', textureImg); 
  
  sphere(200, 100, 100);
  
  
}