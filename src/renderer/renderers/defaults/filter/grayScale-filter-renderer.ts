import { FilterRenderParameters } from '../../../render-system.types';

export function renderGrayScale({imageData}: FilterRenderParameters): ImageData {
    const pixels = imageData.data;
    for (let i = 0, n = pixels.length; i < n; i += 4) {
        const r = pixels[i];         // red
        const g = pixels[i + 1];     // green
        const b = pixels[i + 2];     // blue
        // pixels[i+3]              is alpha

        // CIE luminance for the RGB
        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        // const grayscale = 0.2126*r + 0.7152*g + 0.0722*b;
        const grayscale = r * .3 + g * .59 + b * .11;
        pixels[i] = pixels[i + 1] = pixels[i + 2] = grayscale;
    }
    return imageData;
}
