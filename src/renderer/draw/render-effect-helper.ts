export class RenderEffectHelper {

    public static grayScale(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const imgData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels  = imgData.data;
        for (let i = 0, n = pixels.length; i < n; i += 4) {
            const grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
            pixels[i  ] = grayscale;        // red
            pixels[i + 1] = grayscale;        // green
            pixels[i + 2] = grayscale;        // blue
            // pixels[i+3]              is alpha
        }

        // Redraw the image in black & white
        context.putImageData(imgData, 0, 0);
    }

    public static blur(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement | HTMLImageElement, passes = 4) {
        context.globalAlpha = 0.125;
        // Loop for each blur pass.
        for (let i = 1; i <= passes; i++) {
            for (let y = -1; y < 2; y++) {
                for (let x = -1; x < 2; x++) {
                    context.drawImage(canvas, x, y);
                }
            }
        }
        context.globalAlpha = 1.0;
    }

    public static negative(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i]   = 255 - pixels[i];   // red
            pixels[i + 1] = 255 - pixels[i + 1]; // green
            pixels[i + 2] = 255 - pixels[i + 2]; // blue
            // i+3 is alpha (the fourth element)
        }

        // overwrite original image
        context.putImageData(imageData, 0, 0);
    }
}
