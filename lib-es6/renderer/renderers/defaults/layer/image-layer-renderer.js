import { Canvas2DDrawHelper } from '../../../canvas/canvas-draw-helper';
import { DrawHelper } from '../../../draw/draw-helper';
import { displayBackground } from '../../../utils';
export function renderImageLayer(_a) {
    var rendererSystem = _a.rendererSystem, context = _a.context, view = _a.view, layer = _a.layer;
    Canvas2DDrawHelper.clearCanvas(context, view.size.x, view.size.y);
    if (layer.visible === undefined || layer.visible) {
        var contextOptionsDefault = rendererSystem.getContextOptions();
        displayBackground({ context: context, layer: layer, view: view, contextOptionsDefault: contextOptionsDefault });
        Canvas2DDrawHelper.updateOpacity(context, layer.opacity);
        var source = rendererSystem.getResource(layer.id);
        DrawHelper.drawFromSpriteAndView(context, view, {
            position: { x: layer.x, y: layer.y },
            size: { x: source.width, y: source.height },
        }, source);
    }
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/layer/image-layer-renderer.js.map