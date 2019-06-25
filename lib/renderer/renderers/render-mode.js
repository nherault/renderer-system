"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderMode;
(function (RenderMode) {
    RenderMode["NONE"] = "none";
    RenderMode["PREFETCH"] = "prefetch";
    RenderMode["ONCE"] = "once";
    RenderMode["NORMAL"] = "normal";
})(RenderMode || (RenderMode = {}));
function isRenderOnceLayer(layer) {
    return layer.renderMode !== undefined && layer.renderMode === RenderMode.ONCE;
}
exports.isRenderOnceLayer = isRenderOnceLayer;
function isRenderPrefetchLayer(layer) {
    return layer.renderMode !== undefined && layer.renderMode === RenderMode.PREFETCH;
}
exports.isRenderPrefetchLayer = isRenderPrefetchLayer;
function isRenderDelayLayer(layer) {
    return layer.renderMode !== undefined && !Number.isNaN(Number.parseInt(layer.renderMode, 10));
}
exports.isRenderDelayLayer = isRenderDelayLayer;
function isRenderLayer(layer) {
    return layer.renderMode === undefined || (layer.renderMode !== undefined && layer.renderMode !== RenderMode.NONE);
}
exports.isRenderLayer = isRenderLayer;
// TODO: Generate here or in engine or in loop-system?
/*
export function generateIsToRender(layer: {renderMode?: string}): (computeElement?: D2D.RenderElement) => boolean {
    if (isRenderOnceLayer(layer)) {
        return D2D.renderOnce;
    } else if (isRenderDelayLayer(layer)) {
        return D2D.renderDelay.bind(null, Number.parseInt(layer.renderMode, 10));
    }
    return () => true;
}
*/
//# sourceMappingURL=../../../src/src/renderer/renderers/render-mode.js.map