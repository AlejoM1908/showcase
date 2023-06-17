

let theShader;

let cams;
let blackwhite;
let blur;
let contraste;
let sepia;
let vineta;


function preload(){
  // load the shader and image
  theShader = loadShader('content/sketches/shaders/cam.vert', 'content/sketches/shaders/blackwhite.frag');
  cams = loadShader('content/sketches/shaders/cam.vert', 'content/sketches/shaders/cam.frag');
  blackwhite = loadShader('content/sketches/shaders/cam.vert', 'content/sketches/shaders/blackwhite.frag');
  blur = loadShader('content/sketches/shaders/cam.vert', 'content/sketches/shaders/blur.frag');
  contraste = loadShader('content/sketches/shaders/cam.vert', 'content/sketches/shaders/contraste.frag');
  sepia = loadShader('content/sketches/shaders/cam.vert', 'content/sketches/shaders/sepia.frag');
  vineta = loadShader('content/sketches/shaders/cam.vert', 'content/sketches/shaders/vineta.frag');
  
  
  cam = loadImage('content/assets/image/iceland2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  //cam = createCapture(VIDEO);
  //cam.size(windowWidth, windowHeight);
  
  //cam.hide();
}

function draw() {
  
  shader(theShader);
  
  // passing cam as a texture
  theShader.setUniform('tex0', cam);
  theShader.setUniform('texSize', [cam.width, cam.height]);
  

  // rect gives us some geometry on the screen
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

