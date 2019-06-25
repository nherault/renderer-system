"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../../utils/utils");
var utils_2 = require("../../../utils");
function renderRectangle(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = utils_2.computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetPositionX = utils_1.computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.x; }, 0);
    var offsetPositionY = utils_1.computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.y; }, 0);
    var sizeX = utils_1.computeOrDefault(currentRenderer.size, function (size) { return size.x; }, currentObject.size.x);
    var sizeY = utils_1.computeOrDefault(currentRenderer.size, function (size) { return size.y; }, currentObject.size.y);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    utils_2.computeStrokeFill(currentRenderer, function () { return context.strokeRect(x + offsetPositionX, y + offsetPositionY, sizeX, sizeY); }, function () { return context.fillRect(x + offsetPositionX, y + offsetPositionY, sizeX, sizeY); });
}
exports.renderRectangle = renderRectangle;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/rectangle-renderer.js.map