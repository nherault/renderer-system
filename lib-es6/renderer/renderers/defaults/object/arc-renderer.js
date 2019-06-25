import { computeOrDefault, degToRad, getOrDefault } from '../../../../utils/utils';
import { computePositionWithVelocity, computeStrokeFill } from '../../../utils';
export function renderArc(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetPositionX = computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.x; }, 0);
    var offsetPositionY = computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.y; }, 0);
    var radius = getOrDefault(currentRenderer.radius, (currentObject.size.x + currentObject.size.y) / 4);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    var startAngle = getOrDefault(currentRenderer.startAngle, 0);
    var endAngle = getOrDefault(currentRenderer.endAngle, 360);
    context.beginPath();
    context.arc(x + offsetPositionX + radius, y + offsetPositionY + radius, radius, degToRad(startAngle), degToRad(endAngle));
    context.closePath();
    computeStrokeFill(currentRenderer, function () { return context.stroke(); }, function () { return context.fill(); });
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/arc-renderer.js.map