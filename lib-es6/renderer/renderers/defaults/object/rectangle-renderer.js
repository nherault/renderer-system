import { computeOrDefault } from '../../../../utils/utils';
import { computePositionWithVelocity, computeStrokeFill } from '../../../utils';
export function renderRectangle(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var offsetPositionX = computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.x; }, 0);
    var offsetPositionY = computeOrDefault(currentRenderer.offsetPosition, function (offsetPosition) { return offsetPosition.y; }, 0);
    var sizeX = computeOrDefault(currentRenderer.size, function (size) { return size.x; }, currentObject.size.x);
    var sizeY = computeOrDefault(currentRenderer.size, function (size) { return size.y; }, currentObject.size.y);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    computeStrokeFill(currentRenderer, function () { return context.strokeRect(x + offsetPositionX, y + offsetPositionY, sizeX, sizeY); }, function () { return context.fillRect(x + offsetPositionX, y + offsetPositionY, sizeX, sizeY); });
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/rectangle-renderer.js.map