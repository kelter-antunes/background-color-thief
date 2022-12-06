/*!
 * Back Ground Color Thief
 * by Srinivas Dasari - http://www.sodhanalibrary.com
 *
 * License
 * -------
 * Creative Commons Attribution 2.5 License:
 * http://creativecommons.org/licenses/by/2.5/
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 * Lokesh Dhakar - For color theif - inspiration
 */


/*
  CanvasImage Class
  Class that wraps the html image element and canvas.
  It also simplifies some of the canvas context manipulation
  with a set of helper functions.
*/
var CanvasImage = function(image) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    this.width = this.canvas.width = image.width;
    this.height = this.canvas.height = image.height;

    this.context.drawImage(image, 0, 0, this.width, this.height);
};

CanvasImage.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
};

CanvasImage.prototype.update = function(imageData) {
    this.context.putImageData(imageData, 0, 0);
};

CanvasImage.prototype.getPixelCount = function() {
    return this.width * this.height;
};

CanvasImage.prototype.getWidth = function() {
    return this.width;
};

CanvasImage.prototype.getHeight = function() {
    return this.height;
};

CanvasImage.prototype.getImageData = function() {
    return this.context.getImageData(0, 0, this.width, this.height);
};

CanvasImage.prototype.removeCanvas = function() {
    this.canvas.parentNode.removeChild(this.canvas);
};

CanvasImage.prototype.markPixels = function(pixels) {
    var imageData = this.context.getImageData(0, 0, this.width, this.height);
    for (var i = 0; i < pixels.length; i++) {
        var pos = pixels[i];
        imageData.data[pos++] = 255;
        imageData.data[pos++] = 0;
        imageData.data[pos++] = 0;
        imageData.data[pos++] = 255;
    }
    this.context.putImageData(imageData, 0, 0);
};


var BackgroundColorTheif = function() {};

/*
 * getBackGroundColor(sourceImage[, quality])
 * returns {r: num, g: num, b: num}
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar
 * colors and return the base color from the largest cluster.
 *
 * quality is an optional argument that must be an Integer of value 1 or greater, and defaults to 10. 
 * The number determines how many pixels are skipped before the next one is sampled. 
 * We rarely need to sample every single pixel in the image to get good results. The bigger the number, the faster a value will be returned.
 *
 * */
BackgroundColorTheif.prototype.getBackGroundColor = function(sourceImage) {
    var backGroundColor = this.getPixelColor(sourceImage);
    return backGroundColor;
};


/*
 *
 *
 */
BackgroundColorTheif.prototype.getPixelColor = function(sourceImage) {


    // Create custom CanvasImage object
    var image = new CanvasImage(sourceImage);

    //var imageData = image.getImageData();
    var imageData = image.getImageData(2, 2, 1, 1);

    var p = imageData.data;

    var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
    console.log(hex);

    // Clean up
    image.removeCanvas();

    return hex;
};

BackgroundColorTheif.prototype.rgbToHex = function(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
};