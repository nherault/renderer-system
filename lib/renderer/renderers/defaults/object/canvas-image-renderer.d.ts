import { ObjectRenderParameters } from '../../../render-system.types';
import { CanvasRendererData, ImageRendererData } from '../../renderer-data.types';
export interface CanvasImageRendererParameters extends ObjectRenderParameters {
    currentRenderer: CanvasRendererData | ImageRendererData;
}
export declare function renderCanvasImage({ context, currentObject, currentRenderer, elapseTime }: CanvasImageRendererParameters): void;
