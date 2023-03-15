---
weight: 2
---

# Coloring a sphere with HSB color model



# HSB Color Mode

HSB Color Mode una manera de representar colores usando tres valores: Matiz, saturación y brillo. HSB significa Matiz, Saturación y Brillo por sus siglas en inglés (Hue, Saturation, and Brightness) y aveces también se le llama HSV (Hue, Saturation, Value).

En HSB Color Mode el matiz todavía se representa por una rueda de color donde los colores son organizados en un círculo de acuerdo a su ángulo de matiz. El matiz es medido en grados, con rojo en 0°, verde en 120° y azul en 240° y todos los demás matices organizados entre los tres colores primarios.

La saturación es una medida de que tan intenso o puro un color es y es expresado como un porcentaje desde 0% (completamente desaturado) a 100% (completamente saturado). En el HSB Color Mode un color completamente saturado no tiene agregado ningún blanco, gris o negro mientras que un color desaturado tiene agregado alguna cantidad de blanco, gris o negro.

La tercera propiedad en HSB Color Mode es el brillo que representa la cantidad de luz reflejada por un color, también se expresa como un porcentaje desde 0% (completamente negro) a 100% (completamente blanco). En HSB Color Mode la luminosidad es distinta de la saturación lo que permite que un color puede ser altamente saturado y con un brillo intenso al mismo tiempo o altamente desaturado y oscuro.

Una ventaja de usar HSB Color Mode es que puede ser mas intuitivo para muchos usuarios ya que corresponde mas cercanamente a la manera como la gente percibe y describe el color. Por ejemplo, cuando hablamos de un color “brillante” u “oscuro” nos referimos al brillo del color que se representa de manera más directa en el HSB Color Mode.

## Example

{{< p5-global-iframe id="breath" width="600" height="600" >}}
let cols = 100;
let rows = 100;

let vert = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  imageMode(CENTER);
  
  noStroke();
  
  for(let theta = 0; theta < rows; theta++){
    vert.push([]);
    for(let phi = 0; phi < cols; phi++){
      
      let noiseX = map(sin(theta*180/rows) * cos(phi*360/cols),-1,1,0,2);
      let noiseY = map(cos(theta*180/rows),-1,1,0,6);
      let noiseZ = map(sin(theta*180/rows) * cos(phi*360/cols),-1,1,0,2);
      
      let hue = map(noise(noiseX,noiseY,noiseZ),0,1,150,340);
  
      let pos = createVector(
        200 * sin(theta*180/rows) * cos(phi*360/cols),
        200 * cos(theta*180/rows),
        200 * sin(theta*180/rows) * sin(phi*360/cols)
      
      );
      vert[theta].push([pos, hue]);
      
    }
    
  }
  
}

function draw() {
  clear();
  orbitControl(4, 4); //3D mouse control
  
  
  for(let theta = 0; theta < vert.length; theta++){
    
    for(let phi = 0; phi < vert[theta].length; phi++){
      
      fill(vert[theta][phi][1],100,100);
      if(theta < vert.length-1 && phi < vert[theta].length-1){
        beginShape();

        vertex(vert[theta][phi][0].x,vert[theta][phi][0].y,vert[theta][phi][0].z);
        vertex(vert[theta+1][phi][0].x,vert[theta+1][phi][0].y,vert[theta+1][phi][0].z);
        vertex(vert[theta+1][phi+1][0].x,vert[theta+1][phi+1][0].y,vert[theta+1][phi+1][0].z);
        vertex(vert[theta][phi+1][0].x,vert[theta][phi+1][0].y,vert[theta][phi+1][0].z);

      endShape(CLOSE);
      }else if(theta < vert.length-1 && phi == vert[theta].length-1){
        beginShape();
        vertex(vert[theta][phi][0].x,vert[theta][phi][0].y,vert[theta][phi][0].z);
        vertex(vert[theta][0][0].x,vert[theta][0][0].y,vert[theta][0][0].z);
        vertex(vert[theta+1][0][0].x,vert[theta+1][0][0].y,vert[theta+1][0][0].z);
        vertex(vert[theta+1][phi][0].x,vert[theta+1][phi][0].y,vert[theta+1][phi][0].z);

        endShape(CLOSE);
      }else if(theta == vert.length-1 ){
        beginShape();
        
        for(let i = 0; i < phi; i++){
            vertex(vert[theta][i][0].x,vert[theta][i][0].y,vert[theta][i][0].z);
        }

        endShape(CLOSE);
      }
      
      
    }
    
  }
  
}
{{< /p5-global-iframe >}}

# References

Bear, J. H. (2012, 24 de junio). Understanding the HSV Color Model. Lifewire. https://www.lifewire.com/what-is-hsv-in-design-1078068


