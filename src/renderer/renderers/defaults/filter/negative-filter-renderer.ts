import { FilterRenderParameters } from '../../../render-system.types';

export function renderNegative({imageData}: FilterRenderParameters): ImageData {
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = 255 - pixels[i]; // red
            pixels[i + 1] = 255 - pixels[i + 1]; // green
            pixels[i + 2] = 255 - pixels[i + 2]; // blue
            // i+3 is alpha (the fourth element)
    }
    return imageData;
}
