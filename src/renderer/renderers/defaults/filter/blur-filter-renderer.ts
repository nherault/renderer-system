import { FilterRenderParameters } from '../../../render-system.types';
import { convoluteFilter } from './convolution-filter';

export function renderBlur({imageData, filterData}: FilterRenderParameters): ImageData {
    const blurSize = getBlurSize(filterData);
    const weights = [
        1 / blurSize, 1 / blurSize, 1 / blurSize,
        1 / blurSize, 1 / blurSize, 1 / blurSize,
        1 / blurSize, 1 / blurSize, 1 / blurSize,
    ];
    return convoluteFilter(imageData, weights);
}

function getBlurSize(data?: { blurSize?: number }): number {
    return data === undefined || data.blurSize === undefined || data.blurSize === 0 ? 9 : data.blurSize;
}
