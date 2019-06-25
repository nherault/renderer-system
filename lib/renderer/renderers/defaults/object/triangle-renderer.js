"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../..");
var utils_1 = require("../../../../utils/utils");
var utils_2 = require("../../../utils");
function renderTriangle(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = __1.computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetPositionX = utils_1.computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.x; }, 0);
    var offsetPositionY = utils_1.computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.y; }, 0);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    context.beginPath();
    context.moveTo(x + offsetPositionX + currentObject.size.x / 2, y + offsetPositionY);
    context.lineTo(x + offsetPositionX, y + offsetPositionY + currentObject.size.y);
    context.lineTo(x + offsetPositionX + currentObject.size.x, y + offsetPositionY + currentObject.size.y);
    context.lineTo(x + offsetPositionX + currentObject.size.x / 2, y + offsetPositionY);
    context.closePath();
    utils_2.computeStrokeFill(currentRenderer, function () { return context.stroke(); }, function () { return context.fill(); });
}
exports.renderTriangle = renderTriangle;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/triangle-renderer.js.map