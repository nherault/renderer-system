"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas2DDrawHelper = /** @class */ (function () {
    function Canvas2DDrawHelper() {
    }
    Canvas2DDrawHelper.clearCanvas = function (context, width, height) {
        context.clearRect(0, 0, width, height);
        return this;
    };
    Canvas2DDrawHelper.updateOpacity = function (context, opacity, defaultOpacity) {
        if (defaultOpacity === void 0) { defaultOpacity = 1.0; }
        context.globalAlpha = opacity !== undefined ? opacity : defaultOpacity;
        return this;
    };
    Canvas2DDrawHelper.drawFromCanvas = function (context, source, coordx, coordy) {
        if (source) {
            context.drawImage(source, coordx, coordy);
        }
        return this;
    };
    Canvas2DDrawHelper.drawFromCanvasAndScale = function (context, source, coordx, coordy, widthTarget, heightTarget) {
        if (source) {
            context.drawImage(source, coordx, coordy, widthTarget, heightTarget);
        }
        return this;
    };
    Canvas2DDrawHelper.drawFromCanvasClippingAndScale = function (context, source, coordx, coordy, sourceClipping) {
        if (source) {
            context.drawImage(source, sourceClipping.position.x, sourceClipping.position.y, sourceClipping.size.x, sourceClipping.size.y, coordx, coordy, sourceClipping.size.x, sourceClipping.size.y);
        }
        return this;
    };
    Canvas2DDrawHelper.drawFromCanvasAndScalePercent = function (context, source, coordx, coordy, percentTarget) {
        if (source) {
            context.drawImage(source, coordx, coordy, source.width * percentTarget, source.height * percentTarget);
        }
        return this;
    };
    return Canvas2DDrawHelper;
}());
exports.Canvas2DDrawHelper = Canvas2DDrawHelper;
//# sourceMappingURL=../../../src/src/renderer/canvas/canvas-draw-helper.js.map