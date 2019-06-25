export declare class CanvasLayerManager {
    private width;
    private height;
    private layers;
    private contextLayers;
    constructor(width: number, height: number);
    addLayer(id: string, zIndex: number | string): HTMLCanvasElement;
    initLayers(...layerIds: string[]): CanvasLayerManager;
    redrawLayers(width: number, height: number): CanvasLayerManager;
    resetLayers(): CanvasLayerManager;
    removeLayer(id: string): CanvasLayerManager;
    initLayersToDisplay(displayElement: HTMLElement): CanvasLayerManager;
    getCanvas(id: string): HTMLCanvasElement | undefined;
    getCanvasContext(id: string): CanvasRenderingContext2D | undefined;
    getWidth(): number;
    getHeight(): number;
}
