import { View } from './commons/view/view.types';
import { ContextOptions } from './renderers/renderer-data.types';
import { LayerData, SceneData } from './scene/scene.types';
export interface RendererSystem {
    init(config: RenderSystemConfig): void;
    initScene(displayEl: HTMLElement, sceneData: any): void;
    getRenderContext(renderId: string): CanvasRenderingContext2D | undefined;
    getResource(resourceId: string): any;
    getContextOptions(): ContextOptions;
    getSceneRenderers(): SceneRenderFunctions;
    getLayerRenderers(): LayerRenderFunctions;
    getObjectRenderers(): ObjectRenderFunctions;
}
export interface SceneRenderFunctions {
    [id: string]: (params: SceneRenderDataParameters) => void;
}
export interface LayerRenderFunctions {
    [id: string]: (params: LayerRenderDataParameters) => void;
}
export interface ObjectRenderFunctions {
    [id: string]: (params: ObjectRenderParameters) => void;
}
export interface Renderers {
    layers: LayerRenderFunctions;
    objects: ObjectRenderFunctions;
    scenes: SceneRenderFunctions;
}
export interface SceneRenderDataParameters {
    rendererSystem: RendererSystem;
    renderState: SceneData;
    elapseTime: number;
}
export interface LayerRenderDataParameters {
    rendererSystem: RendererSystem;
    context: CanvasRenderingContext2D;
    layer: LayerData;
    renderState: SceneData;
    view: View;
    elapseTime: number;
}
export interface ObjectRenderParameters {
    rendererSystem: RendererSystem;
    context: CanvasRenderingContext2D;
    currentObject: ObjectRenderer;
    currentRenderer: ObjectRendererDataParameters;
    view: View;
    elapseTime: number;
}
export interface ObjectRenderer {
    visible?: boolean;
    renderers?: ObjectRendererDataParameters[];
    [propName: string]: any;
}
export interface ObjectRendererDataParameters {
    type: string;
    visible?: boolean;
    [propName: string]: any;
}
export interface LayerRender {
    [id: string]: (params: LayerRenderDataParameters) => void;
}
export interface ObjectRender {
    [id: string]: (params: ObjectRenderParameters) => void;
}
export interface RenderSystemConfig {
    contextOptions: ContextOptions;
    renderers: Renderers;
    resourceFinder: (resourceId: string) => any;
}
