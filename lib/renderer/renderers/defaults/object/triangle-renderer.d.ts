import { ObjectRenderParameters } from '../../../render-system.types';
import { TriangleRendererData } from '../../renderer-data.types';
export interface TriangleRendererParameters extends ObjectRenderParameters {
    currentRenderer: TriangleRendererData;
}
export declare function renderTriangle({ context, currentObject, currentRenderer, elapseTime }: TriangleRendererParameters): void;
