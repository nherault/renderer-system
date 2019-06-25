import { ObjectRenderParameters } from '../../../render-system.types';
import { TextRendererData } from '../../renderer-data.types';
export interface TextRendererParameters extends ObjectRenderParameters {
    currentRenderer: TextRendererData;
}
export declare function renderText({ context, currentObject, currentRenderer, view, elapseTime }: TextRendererParameters): void;
