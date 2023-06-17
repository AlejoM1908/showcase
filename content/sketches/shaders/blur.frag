#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform vec2 texSize;
varying vec2 vTexCoord;

const float blurSize = 2.0; // blur size
const int numSamples = 9; // near colors

void main() {
  // Coords
  vec2 uv = vTexCoord * texSize;
  
  // near color media
  vec4 sum = vec4(0.0);
  for (int i = -numSamples; i <= numSamples; i++) {
    for (int j = -numSamples; j <= numSamples; j++) {
      sum += texture2D(tex0, (uv + vec2(i, j) * blurSize) / texSize);
    }
  }
  sum /= float((2 * numSamples + 1) * (2 * numSamples + 1));
  
  // rendering
  gl_FragColor = sum;
}