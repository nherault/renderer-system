import { LayerRenderDataParameters } from '../../../render-system.types';
import { ImageLayerData } from '../../../scene/scene.types';
interface ImageLayerRenderDataParameters extends LayerRenderDataParameters {
    layer: ImageLayerData;
}
export declare function renderImageLayer({ rendererSystem, context, view, layer }: ImageLayerRenderDataParameters): void;
export {};
