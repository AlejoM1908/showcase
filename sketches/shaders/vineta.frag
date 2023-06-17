#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform vec2 texSize;
varying vec2 vTexCoord;

void main() {
  
  vec2 uv = vTexCoord * texSize;
  
  // distance to the center
  float dist = distance(uv, vec2(0.5));
  
  // smoothstep
  float vignette = smoothstep(0.6, 0.9, dist);
  
  // original color
  vec4 color = texture2D(tex0, vTexCoord);
  
  
  color.rgb *= vignette;
  
  // render
  gl_FragColor = color;
}