var RenderMode;
(function (RenderMode) {
    RenderMode["NONE"] = "none";
    RenderMode["PREFETCH"] = "prefetch";
    RenderMode["ONCE"] = "once";
    RenderMode["NORMAL"] = "normal";
})(RenderMode || (RenderMode = {}));
export function isRenderOnceLayer(layer) {
    return layer.renderMode !== undefined && layer.renderMode === RenderMode.ONCE;
}
export function isRenderPrefetchLayer(layer) {
    return layer.renderMode !== undefined && layer.renderMode === RenderMode.PREFETCH;
}
export function isRenderDelayLayer(layer) {
    return layer.renderMode !== undefined && !Number.isNaN(Number.parseInt(layer.renderMode, 10));
}
export function isRenderLayer(layer) {
    return layer.renderMode === undefined || (layer.renderMode !== undefined && layer.renderMode !== RenderMode.NONE);
}
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