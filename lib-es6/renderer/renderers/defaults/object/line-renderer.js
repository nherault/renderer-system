import { computeOrDefault } from '../../../../utils/utils';
import { computePositionWithVelocity } from '../../../utils';
export function renderLine(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetStartX = computeOrDefault(currentRenderer.offsetStart, function (offsetStart) { return offsetStart.x; }, 0);
    var offsetStartY = computeOrDefault(currentRenderer.offsetStart, function (offsetStart) { return offsetStart.y; }, 0);
    var offsetEndX = computeOrDefault(currentRenderer.offsetEnd, function (offsetEnd) { return offsetEnd.x; }, 0);
    var offsetEndY = computeOrDefault(currentRenderer.offsetEnd, function (offsetEnd) { return offsetEnd.y; }, 0);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    context.beginPath();
    context.moveTo(x + offsetStartX, y + offsetStartY);
    context.lineTo(x + currentObject.size.x - offsetEndX, y + currentObject.size.y - offsetEndY);
    context.closePath();
    context.stroke();
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/line-renderer.js.map