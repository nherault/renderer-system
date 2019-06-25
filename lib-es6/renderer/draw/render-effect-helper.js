var RenderEffectHelper = /** @class */ (function () {
    function RenderEffectHelper() {
    }
    RenderEffectHelper.grayScale = function (context, canvas) {
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
            var grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
            pixels[i] = grayscale; // red
            pixels[i + 1] = grayscale; // green
            pixels[i + 2] = grayscale; // blue
            // pixels[i+3]              is alpha
        }
        // Redraw the image in black & white
        context.putImageData(imgData, 0, 0);
    };
    RenderEffectHelper.blur = function (context, canvas, passes) {
        if (passes === void 0) { passes = 4; }
        context.globalAlpha = 0.125;
        // Loop for each blur pass.
        for (var i = 1; i <= passes; i++) {
            for (var y = -1; y < 2; y++) {
                for (var x = -1; x < 2; x++) {
                    context.drawImage(canvas, x, y);
                }
            }
        }
        context.globalAlpha = 1.0;
    };
    RenderEffectHelper.negative = function (context, canvas) {
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i] = 255 - pixels[i]; // red
            pixels[i + 1] = 255 - pixels[i + 1]; // green
            pixels[i + 2] = 255 - pixels[i + 2]; // blue
            // i+3 is alpha (the fourth element)
        }
        // overwrite original image
        context.putImageData(imageData, 0, 0);
    };
    return RenderEffectHelper;
}());
export { RenderEffectHelper };
//# sourceMappingURL=../../../src/src/renderer/draw/render-effect-helper.js.map