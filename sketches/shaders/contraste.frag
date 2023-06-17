#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // original color
  vec4 color = texture2D(tex0, vTexCoord);
  
  // contrast
  float contrast = 2.0; // 
  
  
  vec3 adjustedColor = (color.rgb - 0.5) * contrast + 0.5;
  
  // render
  gl_FragColor = vec4(adjustedColor, color.a);
}