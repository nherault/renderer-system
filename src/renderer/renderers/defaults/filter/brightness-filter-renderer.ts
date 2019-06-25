import { FilterRenderParameters } from '../../../render-system.types';

export function renderBrightness({imageData, filterData}: FilterRenderParameters): ImageData {
    const pixels = imageData.data;
    const adjustment = getAdjustment(filterData);
    for (let i = 0, n = pixels.length; i < n; i += 4) {
        pixels[i] += adjustment;
        pixels[i + 1] += adjustment; // green
        pixels[i + 2] += adjustment; // blue
        // pixels[i+3]              is alpha
    }
    return imageData;
}

function getAdjustment(data?: { adjustment?: number }): number {
    return data === undefined || data.adjustment === undefined ? 0 : data.adjustment;
}
