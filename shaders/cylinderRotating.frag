#ifdef GL_ES
  precision mediump float;
  #endif
  
  varying vec2 vTexCoord;
  uniform float u_xoff;
  uniform float u_yoff;
  
  void main() {
    // Obtén las coordenadas de textura
    vec2 st = vTexCoord;
    
    // Agrega el desplazamiento a las coordenadas de textura
    st += vec2(u_xoff, u_yoff);
    
    // Calcula el patrón utilizando las coordenadas de textura
    float pattern = step(fract(st.x * 8.0), 0.5) * step(fract(st.y * 8.0), 0.5);
    
    // Establece el color del fragmento en función del patrón
    gl_FragColor = vec4(pattern, pattern, pattern, 1.0);
  }