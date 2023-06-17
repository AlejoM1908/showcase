let theShader;

let cams;
let blackwhite;
let blur;
let contraste;
let sepia;
let vineta;


function preload(){
  // load the shader and image
  
  theShader = loadShader('/showcase/sketches/shaders/cam.vert', '/showcase/sketches/shaders/blackwhite.frag');
  cams = loadShader('/showcase/sketches/shaders/cam.vert', '/showcase/sketches/shaders/cam.frag');
  blackwhite = loadShader('/showcase/sketches/shaders/cam.vert', '/showcase/sketches/shaders/blackwhite.frag');
  blur = loadShader('/showcase/sketches/shaders/cam.vert', '/showcase/sketches/shaders/blur.frag');
  contraste = loadShader('/showcase/sketches/shaders/cam.vert', '/showcase/sketches/shaders/contraste.frag');
  sepia = loadShader('/showcase/sketches/shaders/cam.vert', '/showcase/sketches/shaders/sepia.frag');
  vineta = loadShader('/showcase/sketches/shaders/cam.vert', '/showcase/sketches/shaders/vineta.frag');

  cam = loadImage('/showcase/assets/image/iceland2.jpg');
  
 /*
  theShader = loadShader('AlejoM1908/showcase/content/sketches/shaders/cam.vert', 'AlejoM1908/showcase/content/sketches/shaders/blackwhite.frag');
  cams = loadShader('AlejoM1908/showcase/content/sketches/shaders/cam.vert', 'AlejoM1908/showcase/content/sketches/shaders/cam.frag');
  blackwhite = loadShader('AlejoM1908/showcase/content/sketches/shaders/cam.vert', 'AlejoM1908/showcase/content/sketches/shaders/blackwhite.frag');
  blur = loadShader('AlejoM1908/showcase/content/sketches/shaders/cam.vert', 'AlejoM1908/showcase/content/sketches/shaders/blur.frag');
  contraste = loadShader('AlejoM1908/showcase/content/sketches/shaders/cam.vert', 'AlejoM1908/showcase/content/sketches/shaders/contraste.frag');
  sepia = loadShader('AlejoM1908/showcase/content/sketches/shaders/cam.vert', 'AlejoM1908/showcase/content/sketches/shaders/sepia.frag');
  vineta = loadShader('AlejoM1908/showcase/content/sketches/shaders/cam.vert', 'AlejoM1908/showcase/content/sketches/shaders/vineta.frag');
  
  cam = loadImage('AlejoM1908/showcase/content/assets/image/iceland2.jpg');
  */
}

function setup() {
  //createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(500, 480, WEBGL);
  noStroke();
  
}

function draw() {
  
  shader(theShader);
  
  // passing the image as a texture
  theShader.setUniform('tex0', cam);
  theShader.setUniform('texSize', [cam.width, cam.height]);
  

  rect(0,0,width,height);
  
}


function keyPressed() {
  if (key === '1') {
    theShader = blackwhite;
  } else if (key === '2') {
    theShader = blur;
  } else if (key === '3') {
    theShader = contraste;
  } else if (key === '4') {
    theShader = sepia;
  }else if(key == '5'){
    theShader = vineta;
  }else if(key == '6'){
    theShader = cams;
  }
}

