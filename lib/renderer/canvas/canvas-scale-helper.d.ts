export interface CanvasScaleHelperOptions {
    imageRendering?: string;
    smoothImage?: boolean;
    background?: string;
    onWindowResizeEnabled?: boolean;
}
export declare class CanvasScaleHelper {
    static fullScreen(canvas: HTMLCanvasElement): void;
    private bodyEl;
    private displayEl;
    private canvasElList;
    private isInit;
    private options;
    private initialCanvasStyle;
    private initialSmoothImageStyle;
    private initialBodyStyle;
    private initialDisplayElStyle;
    private initialWidth;
    private initialHeight;
    constructor();
    init(displayEl: HTMLElement | HTMLCanvasElement, options?: CanvasScaleHelperOptions): CanvasScaleHelper;
    fullWindow(): CanvasScaleHelper;
    scaleDisplay(scale: number): CanvasScaleHelper;
    resetScaleDisplay(): CanvasScaleHelper;
    private scaleDisplayInternal;
}
