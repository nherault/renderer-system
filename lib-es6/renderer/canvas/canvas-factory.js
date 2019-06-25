var CanvasFactory = /** @class */ (function () {
    function CanvasFactory() {
    }
    CanvasFactory.createCanvas = function (width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };
    CanvasFactory.createCanvasFromImage = function (image) {
        var canvas = CanvasFactory.createCanvas(image.width, image.height);
        var context = canvas.getContext('2d');
        if (context) {
            context.drawImage(image, 0, 0);
        }
        return canvas;
    };
    CanvasFactory.createCanvasFromFunction = function (drawingFunction, width, height) {
        var canvas = CanvasFactory.createCanvas(width, height);
        var context = canvas.getContext('2d');
        if (context) {
            drawingFunction(context, 0, 0);
        }
        return canvas;
    };
    return CanvasFactory;
}());
export { CanvasFactory };
//# sourceMappingURL=../../../src/src/renderer/canvas/canvas-factory.js.map