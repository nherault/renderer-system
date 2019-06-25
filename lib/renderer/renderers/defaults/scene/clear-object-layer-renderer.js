"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scene_types_1 = require("../../../scene/scene.types");
function clearObjectLayerRenderer(_a) {
    var renderState = _a.renderState;
    renderState.layers.forEach(function (layer) {
        if (layer.type === scene_types_1.LayerType.OBJECT_LAYER) {
            layer.objects = [];
        }
    });
}
exports.clearObjectLayerRenderer = clearObjectLayerRenderer;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/scene/clear-object-layer-renderer.js.map