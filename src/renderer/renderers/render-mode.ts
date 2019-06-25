enum RenderMode {
    NONE = 'none',
    PREFETCH = 'prefetch',
    ONCE = 'once',
    NORMAL = 'normal',
}

export function isRenderOnceLayer(layer: {renderMode?: string}): boolean {
    return layer.renderMode !== undefined && layer.renderMode === RenderMode.ONCE;
}

export function isRenderPrefetchLayer(layer: {renderMode?: string}): boolean {
    return layer.renderMode !== undefined && layer.renderMode === RenderMode.PREFETCH;
}

export function isRenderDelayLayer(layer: {renderMode?: string}): boolean {
    return layer.renderMode !== undefined && !Number.isNaN(Number.parseInt(layer.renderMode, 10));
}

export function isRenderLayer(layer: {renderMode?: string}): boolean {
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
