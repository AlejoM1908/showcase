#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // original color
  vec4 color = texture2D(tex0, vTexCoord);
  
  // sepia filter
  vec3 sepiaColor;
  sepiaColor.r = (color.r * 0.393) + (color.g * 0.769) + (color.b * 0.189);
  sepiaColor.g = (color.r * 0.349) + (color.g * 0.686) + (color.b * 0.168);
  sepiaColor.b = (color.r * 0.272) + (color.g * 0.534) + (color.b * 0.131);
  
  // render
  gl_FragColor = vec4(sepiaColor, color.a);
}