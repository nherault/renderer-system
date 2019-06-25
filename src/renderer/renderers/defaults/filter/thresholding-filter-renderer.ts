import { FilterRenderParameters } from '../../../render-system.types';

export function renderThresholding({imageData, filterData}: FilterRenderParameters): ImageData {
    const pixels = imageData.data;
    const threshold = getThreshold(filterData);
    for (let i = 0, n = pixels.length; i < n; i += 4) {
        const r = pixels[i];         // red
        const g = pixels[i + 1];     // green
        const b = pixels[i + 2];     // blue

        const v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255 : 0;    // TODO: colors as parameters
        pixels[i] = pixels[i + 1] = pixels[i + 2] = v;
    }
    return imageData;
}

function getThreshold(data?: { threshold?: number }): number {
    return data === undefined || data.threshold === undefined ? 127 : data.threshold;
}
