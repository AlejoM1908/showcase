precision mediump float;

  varying vec2 vTexCoord;

  uniform sampler2D uTexture;

  void main() {
    vec3 dir = vec3(vTexCoord - 0.5, 1.0);
    float len = length(dir);
    dir = normalize(dir);
    float u = acos(dir.y) / 3.14159265358979323846;
    float v = (atan(dir.z, dir.x) / 3.14159265358979323846 + 1.0) * 0.5;
    gl_FragColor = texture2D(uTexture, vec2(u, v));
  }