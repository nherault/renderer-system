import { FilterRenderParameters } from '../../../render-system.types';
import { convoluteFilter } from './convolution-filter';

export function renderSharpen({imageData, filterData}: FilterRenderParameters): ImageData {
    const sharpen = getSharpen(filterData);
    const weights = [
        0, -1, 0,
        -1, sharpen, -1,
        0, -1, 0,
    ];
    return convoluteFilter(imageData, weights);
}

function getSharpen(data?: { sharpen?: number }): number {
    return data === undefined || data.sharpen === undefined ? 5 : data.sharpen;
}
