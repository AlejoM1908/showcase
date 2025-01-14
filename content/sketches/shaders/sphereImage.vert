attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying vec2 vTexCoord;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    vTexCoord = aTexCoord;
  }