// Defining the kernels to apply to the set of images
let masks = [
    ['Original', [0, 0, 0, 0, 1, 0, 0, 0, 0]],
    ['Desenfoque Gausiano', [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16]],
    ['Detección de bordes', [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]],
    ['Desenfoque de caja', [-1, -1, -1, -1, 8, -1, -1, -1, -1]],
    ['Detección horizontal', [-3, 0, 3, -10, 0, 10, -3, 0, 3]],
    ['Agudeza', [0, -1, 0, -1, 5, -1, 0, -1, 0]],
    ['Detección vertical', [-3, -10, -3, 0, 0, 0, 3, 10, 3]],
    ['Operador de Sobel', [-1, -2, -1, 0, 0, 0, 1, 2, 1]],
    ['Personalizado', [0, 0, 0, 0, 1, 0, 0, 0, 0]]
  ];
  
  // Adding an array of images so new ones can be added in excecution time
  const ORIGINAL_IMAGES = [
    '/showcase/assets/image/hero.jpeg',
    '/showcase/assets/image/cave.jpeg',
    '/showcase/assets/image/figth.jpeg',
    '/showcase/assets/image/rain.jpeg',
    '/showcase/assets/image/sword.jpeg',
  ];
  let loaded_images = [];
  let current_image;
  
  // Defining the required global variables for selected image, kernel and histogram
  let show_histogram = false;
  let histogram_changed = false;
  let mask_changed = false;
  let local_mode = false;
  let selected_mask = 0;
  let selected_image = 0;
  let selected_histogram = 0;
  let brightness = 0;
  
  // Defining other global variables
  const CANVAS_SIZE = 600;
  const HISTOGRAM_HEIGHT = 200;
  let FONT;
  let mask_title;
  let histogram_title;
  let masking_canvas;
  let histogram_canvas;
  let histograms = [];
  
  /**
   * Used to initialize the relevant variables before the setup function
   * The mask title is the first mask in the map
  */
  function preload() {
    FONT = loadFont("/showcase/assets/font/Lato-Regular.ttf");
  
    for (let i = 0; i < ORIGINAL_IMAGES.length; i++) {
      // Load each image path, resize it to a square of the CANVAS_SIZE and add it to the loaded_images array
      loaded_images.push(loadImage(ORIGINAL_IMAGES[i]));
  
      // Resize the image to the CANVAS_SIZE
      loaded_images[i].resize(CANVAS_SIZE, CANVAS_SIZE);
    }
  
  }
  
  /**
   * Used to create the canvas for the mask and the canvas for the histogram below the fist one,
   * then load the selected image to the masking canvas
  */
  function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE + HISTOGRAM_HEIGHT);
    pixelDensity(1);
    
    // Create the masking canvas
    masking_canvas = createGraphics(CANVAS_SIZE, CANVAS_SIZE);
    masking_canvas.position(0, 0);
    masking_canvas.pixelDensity(1);
    
    // Create the histogram canvas
    histogram_canvas = createGraphics(CANVAS_SIZE, HISTOGRAM_HEIGHT);
    histogram_canvas.position(0, CANVAS_SIZE);
    
    // Set the current image to the first one in the loaded_images array
    current_image = loaded_images[selected_image];
    mask_title = masks[selected_mask][0];
  }
  
  /**
   * Loop function that make the software interactive.
   * check the flags after doing anything for optimization
  */
  function draw() {
    background(52, 58, 64);
  
    if (mask_changed) {
      console.log('Mask changed');
      // Check to apply the mask locally or globally
      local_mode ? applyLocalMask() : applyGlobalMask();
      mask_title = masks[selected_mask][0];
  
      // Reset the flags
      mask_changed = false;
      histogram_changed = true;
    }
    
    // Histogram has a change, calculate the new histograms
    if (histogram_changed && show_histogram) {
      calculateHistograms();
      histogram_changed = false;
    }
  
    // load the selected image to the masking canvas
    masking_canvas.image(current_image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    displayName(mask_title, masking_canvas);
    image(masking_canvas, 0, 0);
  
    // Display the histogram if the flag is true
    if (show_histogram) drawHistogram();
  }
  
  /**
   * Used to reload the original selected image, if the mask is not applied locally, then return the selected mask to the original one
  */
  function clearMask() {
    current_image = loaded_images[selected_image];
  
    // If global mode, reset the mask to the original one
    if (!local_mode) {
      selected_mask = 0;
      mask_title = masks[selected_mask][0];
    }
  }
  
  /**
   * Used to display a text in a given canvas with a box just barely containing the whole text
   * @param {string} title - The title to be displayed
   * @param {object} canvas - The canvas to display the text on
  */
  function displayName(title, canvas) {
    canvas.push();
  
    // Calculate the width of the text
    canvas.textFont(FONT);
    canvas.textSize(20);
    let text_width = canvas.textWidth(title) + 10;
  
    // Translate the figure to the top middle of the canvas
    canvas.translate(canvas.width / 2 - text_width / 2, 30);
  
    // Draw the box
    canvas.fill(255);
    canvas.rect(0, 0, text_width, 25);
  
    // Draw the text
    canvas.fill(0);
    canvas.text(title, 5, 20);
  
    canvas.pop();
  
  }
  
  /**
   * Used to generate and display a histogram of the current image.
   * The histogram is generated by counting the number of pixels with a specific value for each color channel
   * The histogram is displayed by drawing a line for each color channel with the number of pixels with a specific value below the masking canvas
   * The posssible histograms are:
   *     - Averrage of the three color channels
   *     - Red channel
   *     - Green channel
   *     - Blue channel
   *     - All of the last 4 histograms in one
  */
  function calculateHistograms() {
    histograms = [];
  
    // Init the histograms array
    for (let i = 0; i < 4; i++) {
      histograms.push(new Array(256).fill(0));
    }
  
    // Calculate the histogram for the three color channels and the average
    for (let i = 0; i < masking_canvas.width; i++) {
      for (let j = 0; j < masking_canvas.height; j++) {
        // Get the color channels
        let channels = getPixel(i, j);
  
        // Calculate the average
        let avg = (channels[0] + channels[1] + channels[2]) / 3;
  
        histograms[0][avg]++;
        histograms[1][channels[0]]++;
        histograms[2][channels[1]]++;
        histograms[3][channels[2]]++;
      }
    }
  
    // Scale down the histograms to fit the histogram canvas
    scaleDownHistograms();
  }
  
  /**
   * Used to scale down the histograms to fit the histogram canvas
  */
  function scaleDownHistograms() {
    // Iterate over the histograms and scale them down
    for (let i = 0; i < histograms.length; i++) {
      let scale_factor = histogram_canvas.height / max(...histograms[i]);
  
      for (let j = 0; j < histograms[i].length; j++) {
        histograms[i][j] *= scale_factor;
      }
    }
  }
  
  /**
   * Used to draw the histogram on the histogram canvas
   * The histogram is drawn by drawing a line for each color channel with the number of pixels with a specific value below the masking canvas
   * The posssible histograms are:
   *     - Averrage of the three color channels (gray transparent color)
   *     - Red channel (red transparent color)
   *     - Green channel (green transparent color)
   *     - Blue channel (blue transparent color)
   *     - All of the last 4 histograms
  */
  function drawHistogram() {
    histogram_canvas.background(150);
    histogram_canvas.stroke(255);
    histogram_canvas.strokeWeight(1);
    let name;
  
    // Draw the histogram for the average of the three color channels
    if (selected_histogram == 0 || selected_histogram == 4) {
      printHistogramArray(histograms[0], color(255, 255, 255, 50));
      selected_histogram != 4 ? name = "Average" : name = "Mixed";
    }
    // Draw the histogram for the red channel
    if (selected_histogram == 1 || selected_histogram == 4) {
      printHistogramArray(histograms[1], color(255, 0, 0, 50));
      selected_histogram != 4 ? name = "Red" : name;
    }
    // Draw the histogram for the green channel
    if (selected_histogram == 2 || selected_histogram == 4) {
      printHistogramArray(histograms[2], color(0, 255, 0, 50));
      selected_histogram != 4 ? name = "Green" : name;
    }
    // Draw the histogram for the blue channel
    if (selected_histogram == 3 || selected_histogram == 4) {
      printHistogramArray(histograms[3], color(0, 0, 255, 50));
      selected_histogram != 4 ? name = "Blue" : name;
    }
  
    // Display the histogram
    displayName(name, histogram_canvas);
    image(histogram_canvas, 0, CANVAS_SIZE);
  }
  
  /**
   * Used to draw the histogram on the histogram canvas
   * @param {Array} histogram - The histogram to be drawn
   * @param {string} color - The color of the histogram
   */
  function printHistogramArray(histogram, color) {
    histogram_canvas.stroke(color);
    for (let i = 0; i < histogram.length; i++) {
      histogram_canvas.line(i, histogram_canvas.height, i, histogram_canvas.height - histogram[i]);
    }
  }
  
  /**
   * Used to get the pixel value of the current image at a given location
   * @param {number} pixelX - The column where the pixel is located
   * @param {number} pixelY - The row where the pixel is located
   * @returns {object} - The pixel value at the given location in [r, g, b] format
  */
  function getPixel(pixelX, pixelY) {
    let index = (pixelX + pixelY * masking_canvas.width) * 4;
  
    return [
      current_image.pixels[index],
      current_image.pixels[index + 1],
      current_image.pixels[index + 2]
    ];
  }
  
  /**
   * Used to set the pixel value of the current image at a given location
   * @param {number} pixelX - The column where the pixel is located
   * @param {number} pixelY - The row where the pixel is located
   * @param {object} pixel - The pixel value to be set in [r, g, b] format
  */
  function setPixel(pixelX, pixelY, pixel) {
    let index = (pixelX + pixelY * masking_canvas.width) * 4;
  
    current_image.pixels[index] = pixel[0];
    current_image.pixels[index + 1] = pixel[1];
    current_image.pixels[index + 2] = pixel[2];
  }
  
  /**
   * Used to apply a mask globally to the current image
  */
  function applyGlobalMask() {
  
    // Iterate over the pixels of the current image
    for (let i = 0; i < masking_canvas.width; i++) {
      for (let j = 0; j < masking_canvas.height; j++) {
        applyMask(i, j);
      }
    }
  }
  
  function applyLocalMask() {
    applyMask(mouseX, mouseY);
  }
  
  /**
   * Used to apply a mask to a specific pixel of the current image
   * @param {number} posX - The column where the pixel is located
   * @param {number} posY - The row where the pixel is located
  */
  function applyMask(posX, posY) {
    // Get the 3x3 zone around the pixel and apply the mask
    for (let i = 0; i < 9; i++) {
        let x = posX + (i % 3) - 1;
        let y = posY + floor(i / 3) - 1;
  
        // Check if the pixel is inside the image
        if (x >= 0 && x < masking_canvas.width && y >= 0 && y < masking_canvas.height) {
          let pixel = getPixel(x, y);
  
          // Apply the mask
          pixel[0] = pixel[0] * masks[selected_mask][i];
          pixel[1] = pixel[1] * masks[selected_mask][i];
          pixel[2] = pixel[2] * masks[selected_mask][i];
  
          setPixel(x, y, pixel);
      }
    }
  }
  
  /**
   * Used to generate a dropzone in the masking canvas to upload and rezise only images
  */
  function handleFile(file) {
    if (file.type === 'image') {
      // get the new image, resize to the masking canvas size and push front to the ORIGINAL_IMAGES array
      let img = createImg(file.data, '');
      img.hide();
      img.resize(masking_canvas.width, masking_canvas.height);
      ORIGINAL_IMAGES.unshift(img);
      selected_image = 0;
    }
    else {
      alert('Solo se permiten imágenes');
    }
  }
  
  /**
   * Used to switch the mask to be applied to the image
   */
  function switchMask() {
    selected_mask++;
  
    if (selected_mask >= masks.length) {
      selected_mask = 0;
      clearMask();
    }
  
    mask_changed = true;
  }
  
  function controlBrightness(increment = true) {
    increment ? brightness++ : brightness--;
  
    current_image.filter('brightness', brightness);
  }
    
  
  /**
   * Used to switch between images in the image array
  */
  function switchImage() {
    selected_image++;
  
    if (selected_image >= loaded_images.length) {
      selected_image = 0;
    }
  
    current_image = loaded_images[selected_image];
    clearMask();
  }
  
  /**
   * Used to activate or deactivate the histogram from the canvas
  */
  function showHistogram() {
    show_histogram = !show_histogram;
  }
  
  /**
   * Used to switch between histograms
   * 0 - RGB
   * 1 - Red
   * 2 - Green
   * 3 - Blue
   * 4 - All
  */
  function switchHistogram() {
    selected_histogram++;
  
    if (selected_histogram >= 5) {
      selected_histogram = 0;
    }
  }
  
  function mousePressed() {
    if (local_mode) {
      mask_changed = true;
    }
  }
  
  /**
   * Used to control multiple function in the program
  */
function keyPressed() {
    switch (key) {
    case 'f':
        switchMask();
        break;
    case 'g':
        show_histogram = !show_histogram;
        histogram_changed = true;
        break;
    case 'h':
        switchImage();
        break;
    case 'j':
        switchHistogram();
        break;
    case 'k':
        local_mode = !local_mode;
        clearMask();
        break;
    case 'v':
        controlBrightness();
        break;
    case 'b':
        controlBrightness(false);
        break;
    case 'r':
        clearMask();
        break;
    }
}