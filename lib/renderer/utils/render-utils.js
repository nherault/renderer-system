"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils/utils");
var context_options_utils_1 = require("./context-options-utils");
exports.computeStrokeFill = function (strokeFillOptions, strokeFunction, fillFunction) {
    if (strokeFillOptions.stroke) {
        strokeFunction();
    }
    if (strokeFillOptions.fill || !strokeFillOptions.stroke) {
        fillFunction();
    }
};
exports.computePositionWithOffset = function (position, offset) {
    return { x: position.x + utils_1.getOrDefault(offset.x, 0), y: position.y + utils_1.getOrDefault(offset.y, 0) };
};
exports.computePositionWithVelocity = function (position, elapsedTime, velocity) {
    return utils_1.computeOrDefault(velocity, function (currVelocity) { return ({
        x: position.x + currVelocity.x * elapsedTime,
        y: position.y + currVelocity.y * elapsedTime,
    }); }, position);
};
function displayBackground(_a) {
    var context = _a.context, view = _a.view, layer = _a.layer, contextOptionsDefault = _a.contextOptionsDefault;
    if (layer.backgroundColor !== undefined) {
        context_options_utils_1.updateContextOptions({ context: context, currentRenderer: layer, contextOptionsDefault: contextOptionsDefault });
        context.fillStyle = layer.backgroundColor;
        context.fillRect(0, 0, view.size.x, view.size.y);
    }
}
exports.displayBackground = displayBackground;
//# sourceMappingURL=../../../src/src/renderer/utils/render-utils.js.map