#ifdef GL_ES
  precision mediump float;
  #endif
  
  varying vec2 vTexCoord;
  uniform float u_xoff;
  uniform float u_yoff;
  
  void main() {
    // tex coord
    vec2 st = vTexCoord;
    
    // movement
    st += vec2(u_xoff, u_yoff);
    
    // pattern
    float pattern = step(fract(st.x * 8.0), 0.5) * step(fract(st.y * 8.0), 0.5);
    
    
    gl_FragColor = vec4(pattern, pattern, pattern, 1.0);
  }