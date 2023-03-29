let cols = 100;
let rows = 100;

let vert = [];

function setup() {
  createCanvas(600, 600, WEBGL);

  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  imageMode(CENTER);

  noStroke();

  for (let theta = 0; theta < rows; theta++) {
    vert.push([]);
    for (let phi = 0; phi < cols; phi++) {

      let noiseX = map(sin(theta * 180 / rows) * cos(phi * 360 / cols), -1, 1, 0, 2);
      let noiseY = map(cos(theta * 180 / rows), -1, 1, 0, 6);
      let noiseZ = map(sin(theta * 180 / rows) * cos(phi * 360 / cols), -1, 1, 0, 2);

      let hue = map(noise(noiseX, noiseY, noiseZ), 0, 1, 150, 340);

      let pos = createVector(
        200 * sin(theta * 180 / rows) * cos(phi * 360 / cols),
        200 * cos(theta * 180 / rows),
        200 * sin(theta * 180 / rows) * sin(phi * 360 / cols)

      );
      vert[theta].push([pos, hue]);

    }

  }

}

function draw() {
  clear();
  orbitControl(4, 4); //3D mouse control

  for (let theta = 0; theta < vert.length; theta++) {

    for (let phi = 0; phi < vert[theta].length; phi++) {

      fill(vert[theta][phi][1], 100, 100);
      if (theta < vert.length - 1 && phi < vert[theta].length - 1) {
        beginShape();

        vertex(vert[theta][phi][0].x, vert[theta][phi][0].y, vert[theta][phi][0].z);
        vertex(vert[theta + 1][phi][0].x, vert[theta + 1][phi][0].y, vert[theta + 1][phi][0].z);
        vertex(vert[theta + 1][phi + 1][0].x, vert[theta + 1][phi + 1][0].y, vert[theta + 1][phi + 1][0].z);
        vertex(vert[theta][phi + 1][0].x, vert[theta][phi + 1][0].y, vert[theta][phi + 1][0].z);

        endShape(CLOSE);
      } else if (theta < vert.length - 1 && phi == vert[theta].length - 1) {
        beginShape();
        vertex(vert[theta][phi][0].x, vert[theta][phi][0].y, vert[theta][phi][0].z);
        vertex(vert[theta][0][0].x, vert[theta][0][0].y, vert[theta][0][0].z);
        vertex(vert[theta + 1][0][0].x, vert[theta + 1][0][0].y, vert[theta + 1][0][0].z);
        vertex(vert[theta + 1][phi][0].x, vert[theta + 1][phi][0].y, vert[theta + 1][phi][0].z);

        endShape(CLOSE);
      } else if (theta == vert.length - 1) {
        beginShape();

        for (let i = 0; i < phi; i++) {
          vertex(vert[theta][i][0].x, vert[theta][i][0].y, vert[theta][i][0].z);
        }

        endShape(CLOSE);
      }

    }

  }

}