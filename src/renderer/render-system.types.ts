import { ContextOptions } from './renderers/renderer-data.types';
import { RenderData, SceneData, View } from './scene/scene.types';
import { SceneDataParam } from './scene/scene-factory';
import { RepeaterManager } from '../utils/repeater/repeater-manager';

export interface RendererSystem {
    init(config: RenderSystemConfig): void;
    initScene(displayEl: HTMLElement, sceneData: SceneDataParam): SceneData;
    getResource(resourceId: string): any;
    getContextOptions(): ContextOptions;
    getObjectRenderers(): ObjectRenderFunctions;
    getSceneRenderers(): SceneRenderFunctions;
    getFilterRenderers(): FilterRenderFunctions;
    getRepeaterManager(): RepeaterManager;
}

export interface RenderSystemConfig {
    repeater: RepeaterManager;
    contextOptions: ContextOptions;
    renderers: Renderers;
    resourceFinder: (resourceId: string) => any;
}

export interface Renderers {
    objects: ObjectRenderFunctions;
    scenes: SceneRenderFunctions;
    filters: FilterRenderFunctions;
}

// Filter Renders
export interface FilterRenderFunctions {
    [id: string]: (params: FilterRenderParameters) => ImageData;
}
export interface FilterRenderParameters {
    imageData: ImageData;
    filterData: any;
}

// Scene Renders
export interface SceneRenderFunctions {
    [id: string]: (params: SceneRenderDataParameters) => void;
}
export interface SceneRenderDataParameters {
    rendererSystem: RendererSystem;
    sceneData: SceneData;
    renderData: RenderData;
    elapseTime: number;
}

// Object Renders
export interface ObjectRenderFunctions {
    [id: string]: (params: ObjectRenderParameters) => void;
}

export interface ObjectRenderParameters {
    rendererSystem: RendererSystem;
    context: CanvasRenderingContext2D;
    currentObject: ObjectRenderer;
    currentRenderer: ObjectRendererDataParameters;
    sceneData: SceneData;
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

export interface ObjectRender {
    [id: string]: (params: ObjectRenderParameters) => void;
}
