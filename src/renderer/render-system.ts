import { initialConfig } from './initial-config/initial-config';
import { FilterRenderFunctions, ObjectRenderFunctions, RendererSystem, RenderSystemConfig, SceneRenderFunctions } from './render-system.types';
import { ContextOptions } from './renderers';
import { RenderData, SceneData } from './scene/scene.types';
import { SceneManager } from './scene/scene-manager';
import { SceneDataParam } from './scene/scene-factory';
import { RepeaterManager } from '../utils/repeater/repeater-manager';

export class RenderSystemDefault implements RendererSystem {

    private config: RenderSystemConfig;
    private currentSceneData?: SceneData;

    constructor() {
        this.config = initialConfig;
    }

    public init(config: RenderSystemConfig): void {
        this.config = config;
    }

    public initScene(displayEl: HTMLElement, sceneDataParam?: SceneDataParam): SceneData {
        this.currentSceneData = SceneManager.initSceneLayers(displayEl, sceneDataParam);
        return this.currentSceneData;
    }

    public render(renderData: RenderData, elapseTime: number): void {
        if (this.currentSceneData !== undefined) {
            this.config.renderers.scenes[this.currentSceneData.type]({
                elapseTime,
                renderData,
                sceneData: this.currentSceneData,
                rendererSystem: this,
            });
        }
    }

    public getContextOptions(): ContextOptions {
        return this.config.contextOptions;
    }

    public getResource(resourceId: string): any {
        return this.config.resourceFinder(resourceId);
    }

    public getObjectRenderers(): ObjectRenderFunctions {
        return this.config.renderers.objects;
    }

    public getSceneRenderers(): SceneRenderFunctions {
        return this.config.renderers.scenes;
    }

    public getFilterRenderers(): FilterRenderFunctions {
        return this.config.renderers.filters;
    }

    public getRepeaterManager(): RepeaterManager {
        return this.config.repeater;
    }
}
