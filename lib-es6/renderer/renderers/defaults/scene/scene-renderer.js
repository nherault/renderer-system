import { isRenderLayer } from '../../render-mode';
export function sceneRenderer(_a) {
    var rendererSystem = _a.rendererSystem, renderState = _a.renderState, elapseTime = _a.elapseTime;
    var layerRenderers = rendererSystem.getLayerRenderers();
    renderState.layers.forEach(function (layer, layerIndex) {
        if (isRenderLayer(layer)
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
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/scene/scene-renderer.js.map