import { LayerRenderDataParameters } from '../../../render-system.types';
import { ObjectLayerData } from '../../../scene/scene.types';
interface ObjectLayerRenderDataParameters extends LayerRenderDataParameters {
    layer: ObjectLayerData;
}
export declare function renderObjectLayer({ rendererSystem, context, view, layer, renderState, elapseTime }: ObjectLayerRenderDataParameters): void;
export {};
