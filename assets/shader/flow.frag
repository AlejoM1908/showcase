#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_time;
uniform int u_showField;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 uv = (st - 0.5) * u_scale;
  
  vec3 color = vec3(0.0);
  
  if (u_showField == 1) {
    vec2 flow = vec2(
      cos(uv.x + u_time * 0.1),
      sin(uv.y + u_time * 0.1)
    );
    
    float magnitude = length(flow);
    color = vec3(magnitude);
  }
  
  gl_FragColor = vec4(color, 1.0);
}
