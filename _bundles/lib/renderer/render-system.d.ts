import { CanvasLayerManager } from './canvas/canvas-layer-manager';
import { LayerRenderFunctions, ObjectRenderFunctions, RendererSystem, RenderSystemConfig, SceneRenderFunctions } from './render-system.types';
import { ContextOptions } from './renderers';
export declare class RenderSystemDefault implements RendererSystem {
    private config;
    private canvasLayerManager;
    constructor();
    init(config: RenderSystemConfig): void;
    initScene(displayEl: HTMLElement, sceneData: any): void;
    getRenderContext(renderId: string): CanvasRenderingContext2D | undefined;
    getContextOptions(): ContextOptions;
    getResource(resourceId: string): any;
    getSceneRenderers(): SceneRenderFunctions;
    getLayerRenderers(): LayerRenderFunctions;
    getObjectRenderers(): ObjectRenderFunctions;
}
export declare function initSceneLayers(canvasLayerManager: CanvasLayerManager, displayEl: HTMLElement, sceneData: any): void;
