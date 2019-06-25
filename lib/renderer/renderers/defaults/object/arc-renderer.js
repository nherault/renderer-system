"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../../utils/utils");
var utils_2 = require("../../../utils");
function renderArc(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = utils_2.computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetPositionX = utils_1.computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.x; }, 0);
    var offsetPositionY = utils_1.computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.y; }, 0);
    var radius = utils_1.getOrDefault(currentRenderer.radius, (currentObject.size.x + currentObject.size.y) / 4);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    var startAngle = utils_1.getOrDefault(currentRenderer.startAngle, 0);
    var endAngle = utils_1.getOrDefault(currentRenderer.endAngle, 360);
    context.beginPath();
    context.arc(x + offsetPositionX + radius, y + offsetPositionY + radius, radius, utils_1.degToRad(startAngle), utils_1.degToRad(endAngle));
    context.closePath();
    utils_2.computeStrokeFill(currentRenderer, function () { return context.stroke(); }, function () { return context.fill(); });
}
exports.renderArc = renderArc;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/arc-renderer.js.map