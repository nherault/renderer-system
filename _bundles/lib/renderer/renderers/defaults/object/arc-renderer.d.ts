import { ObjectRenderParameters } from '../../../render-system.types';
import { ArcRendererData } from '../../renderer-data.types';
export interface ArcRendererParameters extends ObjectRenderParameters {
    currentRenderer: ArcRendererData;
}
export declare function renderArc({ context, currentObject, currentRenderer, elapseTime }: ArcRendererParameters): void;
