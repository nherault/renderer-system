import { CanvasLayerManager } from './canvas/canvas-layer-manager';
import { initialConfig } from './initial-config';
var RenderSystemDefault = /** @class */ (function () {
    function RenderSystemDefault() {
        this.config = initialConfig;
        this.canvasLayerManager = new CanvasLayerManager(0, 0);
    }
    RenderSystemDefault.prototype.init = function (config) {
        this.config = config;
    };
    RenderSystemDefault.prototype.initScene = function (displayEl, sceneData) {
        initSceneLayers(this.canvasLayerManager, displayEl, sceneData);
    };
    RenderSystemDefault.prototype.getRenderContext = function (renderId) {
        return this.canvasLayerManager.getCanvasContext(renderId);
    };
    RenderSystemDefault.prototype.getContextOptions = function () {
        return this.config.contextOptions;
    };
    RenderSystemDefault.prototype.getResource = function (resourceId) {
        return this.config.resourceFinder(resourceId);
    };
    RenderSystemDefault.prototype.getSceneRenderers = function () {
        return this.config.renderers.scenes;
    };
    RenderSystemDefault.prototype.getLayerRenderers = function () {
        return this.config.renderers.layers;
    };
    RenderSystemDefault.prototype.getObjectRenderers = function () {
        return this.config.renderers.objects;
    };
    return RenderSystemDefault;
}());
export { RenderSystemDefault };
export function initSceneLayers(canvasLayerManager, displayEl, sceneData) {
    canvasLayerManager.resetLayers();
    var layerZIndex = 1;
    sceneData.layers.forEach(function (layer) {
        canvasLayerManager.addLayer(layer.id, layerZIndex++);
    });
    canvasLayerManager.redrawLayers(sceneData.view.size.x, sceneData.view.size.y)
        .initLayersToDisplay(displayEl);
}
//# sourceMappingURL=../../src/src/renderer/render-system.js.map