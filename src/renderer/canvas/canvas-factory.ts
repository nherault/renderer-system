
export class CanvasFactory {

    public static createCanvas(width: number, height: number): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    public static createCanvasFromImage(image: HTMLImageElement): HTMLCanvasElement {

        const canvas: HTMLCanvasElement = CanvasFactory.createCanvas(image.width, image.height);
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (context) {
            context.drawImage(image, 0, 0);
        }
        return canvas;
    }

    public static createCanvasFromFunction(
        drawingFunction: (context: CanvasRenderingContext2D, width: number, height: number) => void,
        width: number, height: number): HTMLCanvasElement {

        const canvas: HTMLCanvasElement = CanvasFactory.createCanvas(width, height);
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (context) {
            drawingFunction(context, 0, 0);
        }
        return canvas;
    }
}
