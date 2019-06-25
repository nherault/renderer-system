"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_layer_manager_1 = require("./canvas/canvas-layer-manager");
var initial_config_1 = require("./initial-config");
var RenderSystemDefault = /** @class */ (function () {
    function RenderSystemDefault() {
        this.config = initial_config_1.initialConfig;
        this.canvasLayerManager = new canvas_layer_manager_1.CanvasLayerManager(0, 0);
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
exports.RenderSystemDefault = RenderSystemDefault;
function initSceneLayers(canvasLayerManager, displayEl, sceneData) {
    canvasLayerManager.resetLayers();
    var layerZIndex = 1;
    sceneData.layers.forEach(function (layer) {
        canvasLayerManager.addLayer(layer.id, layerZIndex++);
    });
    canvasLayerManager.redrawLayers(sceneData.view.size.x, sceneData.view.size.y)
        .initLayersToDisplay(displayEl);
}
exports.initSceneLayers = initSceneLayers;
//# sourceMappingURL=../../src/src/renderer/render-system.js.map