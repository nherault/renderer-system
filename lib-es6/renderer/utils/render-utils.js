import { computeOrDefault, getOrDefault } from '../../utils/utils';
import { updateContextOptions } from './context-options-utils';
export var computeStrokeFill = function (strokeFillOptions, strokeFunction, fillFunction) {
    if (strokeFillOptions.stroke) {
        strokeFunction();
    }
    if (strokeFillOptions.fill || !strokeFillOptions.stroke) {
        fillFunction();
    }
};
export var computePositionWithOffset = function (position, offset) {
    return { x: position.x + getOrDefault(offset.x, 0), y: position.y + getOrDefault(offset.y, 0) };
};
export var computePositionWithVelocity = function (position, elapsedTime, velocity) {
    return computeOrDefault(velocity, function (currVelocity) { return ({
        x: position.x + currVelocity.x * elapsedTime,
        y: position.y + currVelocity.y * elapsedTime,
    }); }, position);
};
export function displayBackground(_a) {
    var context = _a.context, view = _a.view, layer = _a.layer, contextOptionsDefault = _a.contextOptionsDefault;
    if (layer.backgroundColor !== undefined) {
        updateContextOptions({ context: context, currentRenderer: layer, contextOptionsDefault: contextOptionsDefault });
        context.fillStyle = layer.backgroundColor;
        context.fillRect(0, 0, view.size.x, view.size.y);
    }
}
//# sourceMappingURL=../../../src/src/renderer/utils/render-utils.js.map