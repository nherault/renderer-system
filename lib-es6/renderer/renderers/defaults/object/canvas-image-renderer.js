import { computePositionWithVelocity } from '../../../utils';
export function renderCanvasImage(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    context.drawImage(currentRenderer.source, position.x, position.y);
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/canvas-image-renderer.js.map