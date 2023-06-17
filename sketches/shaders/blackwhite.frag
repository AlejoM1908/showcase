#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // get original color
  vec4 color = texture2D(tex0, vTexCoord);
  
  // RGB media
  float gray = (color.r + color.g + color.b) / 3.0;
  
  //rendering
  gl_FragColor = vec4(gray, gray, gray, color.a);
}