import { LayerType } from '../../../scene/scene.types';
export function clearObjectLayerRenderer(_a) {
    var renderState = _a.renderState;
    renderState.layers.forEach(function (layer) {
        if (layer.type === LayerType.OBJECT_LAYER) {
            layer.objects = [];
        }
    });
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/scene/clear-object-layer-renderer.js.map