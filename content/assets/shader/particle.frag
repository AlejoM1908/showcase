#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_pos;
uniform vec2 u_prevPos;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
  vec2 pos = (u_pos + 1.0) * 0.5;
  vec2 prevPos = (u_prevPos + 1.0) * 0.5;
  
  vec2 direction = normalize(pos - prevPos);
  
  float intensity = smoothstep(0.0, 0.1, distance(st, pos));
  
  gl_FragColor = vec4(vec3(intensity), 1.0);
}
