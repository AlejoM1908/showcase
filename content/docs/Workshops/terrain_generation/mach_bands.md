---
weight: 1
bookToc: false
---

# Terrain with Perlin Noise

Perlin Noise is used here to represent the "natural" change in incerted triangles in a plane

# Perlin Noise

Perlin Noise is a type of procedural noise function, meaning that it generates random values in a way that looks natural and organic. It was invented by Ken Perlin in 1983 for use in computer graphics.

Perlin Noise generates a grid of values, where each grid point is assigned a random value. These values are then interpolated between neighboring points to create a smooth, continuous distribution of values across the grid. The result is a set of values that appear to vary naturally and consistently.


It is frequently used in video games to make procedurally generated terrain that looks natural; In a game or simulation, you might want to generate a large terrain with mountains, valleys, and other features that appear natural and realistic. One way to do this is to use Perlin noise to generate a height map, which is a grayscale image where each pixel represents the height of the terrain at that point.

To generate the height map, you would start by creating a grid of random vectors, as I mentioned earlier. You would then use a function to interpolate between these vectors, creating a smooth gradient field. Finally, you would sample this gradient field at regular intervals to create a grid of height values.

The result would be a height map that you could use to create the terrain. For example, you could use the height values to place objects like rocks and trees on the terrain, or to calculate the flow of water and other fluids.

![imagen Terreno Generado con Perlin noise](/showcase/assets/image/Fractal_terrain_texture.jpg)

## Example

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/terrain_generator.js" width="600" height="600" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}



# References

K. Perlin, "An image synthesizer," in Proceedings of the 12th Annual Conference on Computer Graphics and Interactive Techniques, vol. 19, no. 3, 1985, pp. 287-296, doi: 10.1145/325165.325247.

The Coding Train. (2016, 4 de mayo). Coding Challenge 11: 3D Terrain Generation with Perlin Noise in Processing [Video]. YouTube. https://www.youtube.com/watch?v=IKB1hWWedMk

