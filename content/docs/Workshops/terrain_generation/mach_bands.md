---
weight: 1
bookToc: false
---

# Terrain with Perlin Noise

Perlin Noise is used here to represent the "natural" change in incerted triangles in a plane

# Perlin Noise

Perlin Noise is a type of procedural noise function, meaning that it generates random values in a way that looks natural and organic. It was invented by Ken Perlin in 1983 for use in computer graphics.

Perlin Noise generates a grid of values, where each grid point is assigned a random value. These values are then interpolated between neighboring points to create a smooth, continuous distribution of values across the grid. The result is a set of values that appear to vary naturally and consistently.

## Example

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/terrain_generator.js" width="600" height="600" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no">}}

# References

K. Perlin, "An image synthesizer," in Proceedings of the 12th Annual Conference on Computer Graphics and Interactive Techniques, vol. 19, no. 3, 1985, pp. 287-296, doi: 10.1145/325165.325247.

The Coding Train. (2016, 4 de mayo). Coding Challenge 11: 3D Terrain Generation with Perlin Noise in Processing [Video]. YouTube. https://www.youtube.com/watch?v=IKB1hWWedMk

