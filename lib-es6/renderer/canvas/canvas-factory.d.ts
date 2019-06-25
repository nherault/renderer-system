export declare class CanvasFactory {
    static createCanvas(width: number, height: number): HTMLCanvasElement;
    static createCanvasFromImage(image: HTMLImageElement): HTMLCanvasElement;
    static createCanvasFromFunction(drawingFunction: (context: CanvasRenderingContext2D, width: number, height: number) => void, width: number, height: number): HTMLCanvasElement;
}
