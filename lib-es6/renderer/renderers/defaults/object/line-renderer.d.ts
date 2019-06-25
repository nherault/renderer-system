import { ObjectRenderParameters } from '../../../render-system.types';
import { LineRendererData } from '../../renderer-data.types';
export interface LineRendererParameters extends ObjectRenderParameters {
    currentRenderer: LineRendererData;
}
export declare function renderLine({ context, currentObject, currentRenderer, elapseTime }: LineRendererParameters): void;
