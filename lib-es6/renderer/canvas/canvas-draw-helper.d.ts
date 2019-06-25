import { RectangleData } from '../commons/shape/shape.types';
export declare class Canvas2DDrawHelper {
    static clearCanvas(context: CanvasRenderingContext2D, width: number, height: number): Canvas2DDrawHelper;
    static updateOpacity(context: CanvasRenderingContext2D, opacity: number, defaultOpacity?: number): Canvas2DDrawHelper;
    static drawFromCanvas(context: CanvasRenderingContext2D, source: HTMLCanvasElement, coordx: number, coordy: number): Canvas2DDrawHelper;
    static drawFromCanvasAndScale(context: CanvasRenderingContext2D, source: HTMLCanvasElement, coordx: number, coordy: number, widthTarget: number, heightTarget: number): Canvas2DDrawHelper;
    static drawFromCanvasClippingAndScale(context: CanvasRenderingContext2D, source: HTMLCanvasElement, coordx: number, coordy: number, sourceClipping: RectangleData): Canvas2DDrawHelper;
    static drawFromCanvasAndScalePercent(context: CanvasRenderingContext2D, source: HTMLCanvasElement, coordx: number, coordy: number, percentTarget: number): Canvas2DDrawHelper;
}
