import { FilterRenderParameters } from '../../../render-system.types';
import { convoluteFilter } from './convolution-filter';
import { renderGrayScale } from './grayScale-filter-renderer';

export function renderSobel(filterRenderParameters: FilterRenderParameters): ImageData {
    const grayscale = renderGrayScale(filterRenderParameters);
    // Note that ImageData values are clamped between 0 and 255, so we need
    // to use a Float32Array for the gradient values because they
    // range between -255 and 255.
    const vertical = convoluteFilter(grayscale,
    [ -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1 ]);
    const horizontal = convoluteFilter(grayscale,
    [ -1, -2, -1,
        0,  0,  0,
        1,  2,  1 ]);

    const tmpCanvas = document.createElement('canvas');
    const tmpCtx = tmpCanvas.getContext('2d');
    if (tmpCtx) {
        const finalImage = tmpCtx.createImageData(vertical.width, vertical.height);
        for (let i = 0; i < finalImage.data.length; i += 4) {
            // make the vertical gradient red
            const v = Math.abs(vertical.data[i]);
            finalImage.data[i] = v;
            // make the horizontal gradient green
            const h = Math.abs(horizontal.data[i]);
            finalImage.data[i + 1] = h;
            // and mix in some blue for aesthetics
            finalImage.data[i + 2] = (v + h) / 4;
            finalImage.data[i + 3] = 255; // opaque alpha
        }
        return finalImage;
    }
    return filterRenderParameters.imageData;
}
