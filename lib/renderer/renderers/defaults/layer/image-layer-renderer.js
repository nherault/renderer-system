"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_draw_helper_1 = require("../../../canvas/canvas-draw-helper");
var draw_helper_1 = require("../../../draw/draw-helper");
var utils_1 = require("../../../utils");
function renderImageLayer(_a) {
    var rendererSystem = _a.rendererSystem, context = _a.context, view = _a.view, layer = _a.layer;
    canvas_draw_helper_1.Canvas2DDrawHelper.clearCanvas(context, view.size.x, view.size.y);
    if (layer.visible === undefined || layer.visible) {
        var contextOptionsDefault = rendererSystem.getContextOptions();
        utils_1.displayBackground({ context: context, layer: layer, view: view, contextOptionsDefault: contextOptionsDefault });
        canvas_draw_helper_1.Canvas2DDrawHelper.updateOpacity(context, layer.opacity);
        var source = rendererSystem.getResource(layer.id);
        draw_helper_1.DrawHelper.drawFromSpriteAndView(context, view, {
            position: { x: layer.x, y: layer.y },
            size: { x: source.width, y: source.height },
        }, source);
    }
}
exports.renderImageLayer = renderImageLayer;
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/layer/image-layer-renderer.js.map