import { getOrDefault } from '../../../../utils/utils';
import { Canvas2DDrawHelper } from '../../../canvas/canvas-draw-helper';
import { Entity2DDrawHelper } from '../../../draw/entity-2d-draw-helper';
import { SceneHandler } from '../../../scene/scene-handler';
import { ResourceType } from '../../../scene/scene.types';
import { AnimationHandler } from '../../../tiles/animation-handler';
import { displayBackground, updateContextOptions } from '../../../utils';
export function renderObjectLayer(_a) {
    var rendererSystem = _a.rendererSystem, context = _a.context, view = _a.view, layer = _a.layer, renderState = _a.renderState, elapseTime = _a.elapseTime;
    Canvas2DDrawHelper.clearCanvas(context, view.size.x, view.size.y);
    if (layer.visible === undefined || layer.visible) {
        var objectRenderers_1 = rendererSystem.getObjectRenderers();
        var contextOptionsDefault_1 = rendererSystem.getContextOptions();
        displayBackground({ context: context, layer: layer, view: view, contextOptionsDefault: contextOptionsDefault_1 });
        layer.objects.forEach(function (currentObject) {
            if (currentObject && getOrDefault(currentObject.visible, true)) {
                if (currentObject.resourceId) {
                    var resource = renderState.resources[currentObject.resourceId];
                    renderObjectByResourceId({ rendererSystem: rendererSystem, context: context, renderState: renderState, currentObject: currentObject, view: view, resource: resource });
                }
                if (currentObject.renderers) {
                    currentObject.renderers.forEach(function (currentRenderer) {
                        computeRenderer({ rendererSystem: rendererSystem, context: context, view: view, layer: layer, renderState: renderState, elapseTime: elapseTime }, currentObject, objectRenderers_1, contextOptionsDefault_1, currentRenderer);
                    });
                }
            }
        });
    }
}
function computeRenderer(_a, currentObject, objectRenderers, contextOptionsDefault, currentRenderer) {
    var rendererSystem = _a.rendererSystem, context = _a.context, view = _a.view, elapseTime = _a.elapseTime;
    if (getOrDefault(currentRenderer.visible, true)) {
        var renderObjectFn = objectRenderers[currentRenderer.type];
        if (renderObjectFn) {
            context.save();
            updateContextOptions({ context: context, currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
            renderObjectFn({ rendererSystem: rendererSystem, context: context, view: view, currentObject: currentObject, currentRenderer: currentRenderer, elapseTime: elapseTime });
            context.restore();
        }
    }
}
function renderObjectByResourceId(_a) {
    var rendererSystem = _a.rendererSystem, context = _a.context, renderState = _a.renderState, currentObject = _a.currentObject, view = _a.view, resource = _a.resource;
    var tilespicture = rendererSystem.getResource(resource.tilesetId);
    var source = tilespicture.source;
    var objectData = currentObject; // TODO: merge objectData AND objectRender
    var sprite = getSprite(objectData, resource, tilespicture, renderState);
    if (sprite) {
        Entity2DDrawHelper.drawEntity2D(context, view, objectData, source, sprite);
    }
}
function getSprite(objectData, resource, tilespicture, sceneData) {
    if (resource.type === ResourceType.ANIMATION) {
        var frames_1 = SceneHandler.getAnimationFromResource(sceneData, resource);
        var animationState = objectData.animation;
        return frames_1 !== undefined && animationState !== undefined ? AnimationHandler.getCurrentSprite({
            frames: frames_1,
            state: animationState,
        }, tilespicture) : undefined;
    }
    else {
        return tilespicture.getSprite(resource.type === ResourceType.TILE ? resource.tileIndex : 0);
    }
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/layer/object-layer-renderer.js.map