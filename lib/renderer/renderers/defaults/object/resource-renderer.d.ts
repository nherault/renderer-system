import { ObjectRenderParameters } from '../../../render-system.types';
import { ResourceRendererData } from '../../renderer-data.types';
export interface ResourceRendererParameters extends ObjectRenderParameters {
    currentRenderer: ResourceRendererData;
}
export declare function renderResource({ rendererSystem, context, currentObject, currentRenderer, elapseTime }: ResourceRendererParameters): void;
