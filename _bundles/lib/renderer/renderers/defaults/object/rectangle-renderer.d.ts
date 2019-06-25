import { ObjectRenderParameters } from '../../../render-system.types';
import { RectangleRendererData } from '../../renderer-data.types';
export interface RectangleRendererParameters extends ObjectRenderParameters {
    currentRenderer: RectangleRendererData;
}
export declare function renderRectangle({ context, currentObject, currentRenderer, elapseTime }: RectangleRendererParameters): void;
