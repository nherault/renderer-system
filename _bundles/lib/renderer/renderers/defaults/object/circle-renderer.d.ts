import { ObjectRenderParameters } from '../../../render-system.types';
import { CircleRendererData } from '../../renderer-data.types';
export interface CircleRendererParameters extends ObjectRenderParameters {
    currentRenderer: CircleRendererData;
}
export declare function renderCircle({ context, currentObject, currentRenderer, elapseTime }: CircleRendererParameters): void;
