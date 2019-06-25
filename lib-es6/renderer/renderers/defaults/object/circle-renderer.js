import { computeOrDefault, getOrDefault } from '../../../../utils/utils';
import { computePositionWithVelocity, computeStrokeFill } from '../../../utils';
export function renderCircle(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetPositionX = computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.x; }, 0);
    var offsetPositionY = computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.y; }, 0);
    var radius = getOrDefault(currentRenderer.radius, (currentObject.size.x + currentObject.size.y) / 4);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    context.beginPath();
    context.arc(x + offsetPositionX + radius, y + offsetPositionY + radius, radius, 0, 2 * Math.PI);
    context.closePath();
    computeStrokeFill(currentRenderer, function () { return context.stroke(); }, function () { return context.fill(); });
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/circle-renderer.js.map