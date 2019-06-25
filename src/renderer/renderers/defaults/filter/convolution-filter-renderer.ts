import { FilterRenderParameters } from '../../../render-system.types';
import { convoluteFilter } from './convolution-filter';

export function renderConvolution({imageData, filterData}: FilterRenderParameters): ImageData {
    const weights = getWeights(filterData);
    const opaque = getOpaque(filterData);
    return convoluteFilter(imageData, weights, opaque);
}

function getWeights(data?: { weights?: number[] }): number[] {
    return data === undefined || data.weights === undefined ? [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1,
    ] : data.weights;
}

function getOpaque(data?: { opaque?: boolean }): boolean {
    return data !== undefined && data.opaque !== undefined && data.opaque;
}
