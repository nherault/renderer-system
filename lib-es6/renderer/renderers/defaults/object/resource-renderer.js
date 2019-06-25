import { computePositionWithVelocity } from '../../..';
export function renderResource(_a) {
    var rendererSystem = _a.rendererSystem, context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var resource = rendererSystem.getResource(currentRenderer.resourceId);
    var position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    context.drawImage(resource, 0, 0, resource.width, resource.height, position.x, position.y, currentObject.size.x, currentObject.size.y);
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/resource-renderer.js.map