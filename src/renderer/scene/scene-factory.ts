import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { LayerData, View, SceneData, TilesetData, ResourceDatas } from './scene.types';
import { getOrDefault } from '../../utils/utils';

export interface SceneDataParam {
    type?: string;
    display?: { size: Vector2DData };
    views?: ViewParam[];
    tilesets?: TilesetData[];
    resources?: ResourceDatas;
}

export interface ViewParam {
    id: string;
    offset?: Vector2DData;
    position?: Vector2DData;
    size?: Vector2DData;
    scale?: number;
    layers: LayerParam[];
}

export interface LayerParam {
    id: string;
    backgroundColor?: string;
    opacity?: number;
    visible?: boolean;
    render?: string | { type: string, data: any };
}

const defaultSceneData: SceneDataParam = {
    display: {
        size: {
            x: 800,
            y: 600,
        },
    },
    resources: {},
    type: 'sceneRenderer',
    views: [
        {
            id: 'mainView',
            layers: [{ id: 'mainLayer' }],
        },
    ],
};

export class SceneFactory {

    public static generateSceneLayers(sceneDataParam?: SceneDataParam): SceneData {

        const type = getOrDefault(sceneDataParam && sceneDataParam.type, defaultSceneData.type);
        const display = getOrDefault(sceneDataParam && sceneDataParam.display, defaultSceneData.display);
        const tilesets = getOrDefault(sceneDataParam && sceneDataParam.tilesets, defaultSceneData.tilesets);
        const resources = getOrDefault(sceneDataParam && sceneDataParam.resources, defaultSceneData.resources);
        const views = getOrDefault(sceneDataParam && sceneDataParam.views, defaultSceneData.views);

        const viewsInitialized = this.generateViews(display, views);

        return {
            type,
            display,
            tilesets,
            resources,
            views: viewsInitialized,
        };
    }

    public static generateViews(display: { size: Vector2DData }, viewParams: ViewParam[]): View[] {
        const views: View[] = [];
        for (let i = 0; i < viewParams.length; i++) {
            const viewParam = viewParams[i];
            const offset = viewParam.offset ? viewParam.offset : { x: 0, y: 0};
            const position = viewParam.position ? viewParam.position : { x: 0, y: 0};
            const size = viewParam.size ? viewParam.size : display.size;
            const layerDatas: LayerData[] = [];
            for (let j = 0; j < viewParam.layers.length; j++) {
                const currentLayer = viewParam.layers[j];
                const context = this.generateLayer({ size, offset: viewParam.offset, index: 1000 + 100 * i + j });
                if (context) {
                    layerDatas.push({
                        ...currentLayer,
                        context,
                    });
                }
            }
            if (layerDatas.length > 0) {
                views.push({
                    id: viewParam.id,
                    offset,
                    position,
                    scale: viewParam.scale !== undefined ? viewParam.scale : 1.0,
                    size,
                    layers: layerDatas,
                });
            }
        }
        return views;
    }

    public static generateLayer({ size, offset, index }:
        { size: Vector2DData, offset?: Vector2DData, index?: number}): CanvasRenderingContext2D | null {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            canvas.width = size.x;
            canvas.height = size.y;
            canvas.style.position = 'absolute';
            canvas.style.top = `${offset ? offset.y : 0}px`;
            canvas.style.left = `${offset ? offset.x : 0}px`;
            canvas.style.zIndex = `${index !== undefined ? index : 0}`;
        }
        return context;
    }
}
