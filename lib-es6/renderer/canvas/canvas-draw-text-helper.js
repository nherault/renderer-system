var Canvas2DDrawTextHelper = /** @class */ (function () {
    function Canvas2DDrawTextHelper() {
    }
    //////////////////////////////////////
    // Draw a text.
    // @text: text to display
    // @coordinate: coordinate of the text
    // @layer: the layer to display the text
    // @style: style of the text
    // @options: options of the text
    //////////////////////////////////////
    Canvas2DDrawTextHelper.drawText = function (text, coordinate, canvasContext, style, options, lineHeight) {
        // Init text style.
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                canvasContext[key] = options[key];
            }
        }
        var currLineHeight = lineHeight ? lineHeight : 15;
        var lineWithoutBreak = text.split('\n');
        for (var n = 0; n < lineWithoutBreak.length; n++) {
            Canvas2DDrawTextHelper.displayText(lineWithoutBreak[n], { x: coordinate.x, y: coordinate.y + n * currLineHeight }, canvasContext, style);
        }
        return this;
    };
    //////////////////////////////////////
    // Draw a wrap text.
    // @text: text to display
    // @coordinate: coordinate of the text
    // @maxWidth: max with of each line
    // @lineHeight: height between each line
    // @layer: the layer to display the text
    // @style: style of the text
    // @options: options of the text
    //////////////////////////////////////
    Canvas2DDrawTextHelper.drawWrapText = function (text, coordinate, maxWidth, lineHeight, canvasContext, style, options) {
        // Init text style.
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                canvasContext[key] = options[key];
            }
        }
        // Display the text.
        var words = text.split(' ');
        var line = '';
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var value = words_1[_i];
            var testLine = line + value + ' ';
            var lineBreak = testLine.search('\n');
            if (lineBreak >= 0) {
                var testLineBreak = testLine.substr(0, lineBreak);
                Canvas2DDrawTextHelper.displayText(testLineBreak, coordinate, canvasContext, style);
                line = testLine.substr(lineBreak + 1, testLine.length);
                coordinate.y += lineHeight;
            }
            else {
                var metrics = canvasContext.measureText(testLine);
                if (metrics.width > maxWidth) {
                    Canvas2DDrawTextHelper.displayText(line, coordinate, canvasContext, style);
                    line = value + ' ';
                    coordinate.y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
        }
        Canvas2DDrawTextHelper.displayText(line, coordinate, canvasContext, style);
        return this;
    };
    //////////////////////////////////////
    // Display the text.
    // @text: text to display
    // @coordinate: coordinate of the text
    // @layer: the layer to display the text
    // @style: style of the text
    //////////////////////////////////////
    Canvas2DDrawTextHelper.displayText = function (text, coordinate, canvasContext, style) {
        if (style === TEXT_STYLE_STROKE) {
            canvasContext.strokeText(text, coordinate.x, coordinate.y);
        }
        else if (!style || style === TEXT_STYLE_FILL) {
            canvasContext.fillText(text, coordinate.x, coordinate.y);
        }
        return this;
    };
    return Canvas2DDrawTextHelper;
}());
var TEXT_STYLE_FILL = 'fill';
var TEXT_STYLE_STROKE = 'stroke';
export { Canvas2DDrawTextHelper, TEXT_STYLE_FILL, TEXT_STYLE_STROKE };
//# sourceMappingURL=../../../src/src/renderer/canvas/canvas-draw-text-helper.js.map