import { renderBlur, renderGrayScale, renderNegative, renderBrightness, renderThresholding, renderSharpen, renderSobel, renderConvolution } from '../renderers/defaults/filter';

// SEE: https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
export const initialFilterRenderers = {
    blur: renderBlur,
    grayscale: renderGrayScale,
    negative: renderNegative,
    brightness: renderBrightness,
    threshold: renderThresholding,
    sharpen: renderSharpen,
    sobel: renderSobel,
    convolution: renderConvolution,
};
