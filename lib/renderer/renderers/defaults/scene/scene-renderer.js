"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_mode_1 = require("../../render-mode");
function sceneRenderer(_a) {
    var rendererSystem = _a.rendererSystem, renderState = _a.renderState, elapseTime = _a.elapseTime;
    var layerRenderers = rendererSystem.getLayerRenderers();
    renderState.layers.forEach(function (layer, layerIndex) {
        if (render_mode_1.isRenderLayer(layer)
        /*&& generateIsToRender(layer)*/ ) {
            var context = rendererSystem.getRenderContext(layer.id);
            if (context) {
                layerRenderers[layer.type]({
                    context: context,
                    elapseTime: elapseTime,
                    layer: renderState.layers[layerIndex],
                    renderState: renderState,
                    rendererSystem: rendererSystem,
                    view: renderState.view,
                });
            }
        }
    });
}
exports.sceneRenderer = sceneRenderer;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/scene/scene-renderer.js.map