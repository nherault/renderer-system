"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../utils");
function renderCanvasImage(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = utils_1.computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    context.drawImage(currentRenderer.source, position.x, position.y);
}
exports.renderCanvasImage = renderCanvasImage;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/canvas-image-renderer.js.map