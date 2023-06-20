#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform float movement;

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;

    vec2 offset = vec2(movement * 0.03, -movement * 0.02);

    vec3 color;
    color.r = texture2D(texture, uv + offset).r;
    color.g = texture2D(texture, uv).g;
    color.b = texture2D(texture, uv - offset).b;

    gl_FragColor = vec4(color, 1.0);
}