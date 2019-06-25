"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../../utils/utils");
var utils_2 = require("../../../utils");
function renderLine(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = utils_2.computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetStartX = utils_1.computeOrDefault(currentRenderer.offsetStart, function (offsetStart) { return offsetStart.x; }, 0);
    var offsetStartY = utils_1.computeOrDefault(currentRenderer.offsetStart, function (offsetStart) { return offsetStart.y; }, 0);
    var offsetEndX = utils_1.computeOrDefault(currentRenderer.offsetEnd, function (offsetEnd) { return offsetEnd.x; }, 0);
    var offsetEndY = utils_1.computeOrDefault(currentRenderer.offsetEnd, function (offsetEnd) { return offsetEnd.y; }, 0);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    context.beginPath();
    context.moveTo(x + offsetStartX, y + offsetStartY);
    context.lineTo(x + currentObject.size.x - offsetEndX, y + currentObject.size.y - offsetEndY);
    context.closePath();
    context.stroke();
}
exports.renderLine = renderLine;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/line-renderer.js.map