let theShader;

let cams;
let blackwhite;
let blur;
let contraste;
let sepia;
let vineta;


function preload(){
  // load the shader and image
  theShader = loadShader('cam.vert', 'blackwhite.frag');
  cams = loadShader('cam.vert', 'cam.frag');
  blackwhite = loadShader('cam.vert', 'blackwhite.frag');
  blur = loadShader('cam.vert', 'blur.frag');
  contraste = loadShader('cam.vert', 'contraste.frag');
  sepia = loadShader('cam.vert', 'sepia.frag');
  vineta = loadShader('cam.vert', 'vineta.frag');
  
  
  cam = loadImage('iceland.jpg');
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

