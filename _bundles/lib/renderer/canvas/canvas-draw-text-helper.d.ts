import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
declare class Canvas2DDrawTextHelper {
    static drawText(text: string, coordinate: Vector2DData, canvasContext: CanvasRenderingContext2D, style?: string, options?: any, lineHeight?: any): Canvas2DDrawTextHelper;
    static drawWrapText(text: string, coordinate: Vector2DData, maxWidth: number, lineHeight: number, canvasContext: CanvasRenderingContext2D, style?: string, options?: any): Canvas2DDrawTextHelper;
    static displayText(text: string, coordinate: Vector2DData, canvasContext: CanvasRenderingContext2D, style?: string): Canvas2DDrawTextHelper;
}
declare const TEXT_STYLE_FILL = "fill";
declare const TEXT_STYLE_STROKE = "stroke";
export { Canvas2DDrawTextHelper, TEXT_STYLE_FILL, TEXT_STYLE_STROKE };
