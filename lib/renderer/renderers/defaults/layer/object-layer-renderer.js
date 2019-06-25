"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../../utils/utils");
var canvas_draw_helper_1 = require("../../../canvas/canvas-draw-helper");
var entity_2d_draw_helper_1 = require("../../../draw/entity-2d-draw-helper");
var scene_handler_1 = require("../../../scene/scene-handler");
var scene_types_1 = require("../../../scene/scene.types");
var animation_handler_1 = require("../../../tiles/animation-handler");
var utils_2 = require("../../../utils");
function renderObjectLayer(_a) {
    var rendererSystem = _a.rendererSystem, context = _a.context, view = _a.view, layer = _a.layer, renderState = _a.renderState, elapseTime = _a.elapseTime;
    canvas_draw_helper_1.Canvas2DDrawHelper.clearCanvas(context, view.size.x, view.size.y);
    if (layer.visible === undefined || layer.visible) {
        var objectRenderers_1 = rendererSystem.getObjectRenderers();
        var contextOptionsDefault_1 = rendererSystem.getContextOptions();
        utils_2.displayBackground({ context: context, layer: layer, view: view, contextOptionsDefault: contextOptionsDefault_1 });
        layer.objects.forEach(function (currentObject) {
            if (currentObject && utils_1.getOrDefault(currentObject.visible, true)) {
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
exports.renderObjectLayer = renderObjectLayer;
function computeRenderer(_a, currentObject, objectRenderers, contextOptionsDefault, currentRenderer) {
    var rendererSystem = _a.rendererSystem, context = _a.context, view = _a.view, elapseTime = _a.elapseTime;
    if (utils_1.getOrDefault(currentRenderer.visible, true)) {
        var renderObjectFn = objectRenderers[currentRenderer.type];
        if (renderObjectFn) {
            context.save();
            utils_2.updateContextOptions({ context: context, currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
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
        entity_2d_draw_helper_1.Entity2DDrawHelper.drawEntity2D(context, view, objectData, source, sprite);
    }
}
function getSprite(objectData, resource, tilespicture, sceneData) {
    if (resource.type === scene_types_1.ResourceType.ANIMATION) {
        var frames_1 = scene_handler_1.SceneHandler.getAnimationFromResource(sceneData, resource);
        var animationState = objectData.animation;
        return frames_1 !== undefined && animationState !== undefined ? animation_handler_1.AnimationHandler.getCurrentSprite({
            frames: frames_1,
            state: animationState,
        }, tilespicture) : undefined;
    }
    else {
        return tilespicture.getSprite(resource.type === scene_types_1.ResourceType.TILE ? resource.tileIndex : 0);
    }
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/layer/object-layer-renderer.js.map