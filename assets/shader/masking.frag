#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform vec2 texSize;
uniform float kernel[25];

void main() {
  vec2 st = gl_FragCoord.xy / texSize;
  vec4 sum = vec4(0.0);

  // Apply the kernel by sampling surrounding pixels
  for (int i = -2; i <= 2; i++) {
    for (int j = -2; j <= 2; j++) {
      vec2 offset = vec2(float(i), float(j)) / texSize;
      sum += texture2D(tex0, st + offset) * kernel[(j + 2) * 5 + (i + 2)];
    }
  }

  gl_FragColor = sum;
}
