import { RendererSystem, FilterRenderFunctions, ObjectRendererDataParameters, ObjectRender } from '../render-system.types';
import { SceneData, View, RenderData, ObjectData, LayerData, ResourceData, ResourceType } from '../scene/scene.types';
import { ContextOptions } from '../renderers';
import { getOrDefault } from '../../utils/utils';
import { updateContextOptions, displayBackground } from '../utils';
import { TilesPicture } from '../tiles/tiles-picture';
import { Entity2DDrawHelper } from './entity-2d-draw-helper';
import { RectangleData } from '../commons/shape/shape.types';
import { SceneHandler } from '../scene/scene-handler';
import { AnimationHandler } from '../tiles/animation-handler';

interface RenderDataParameters {
    rendererSystem: RendererSystem;
    context: CanvasRenderingContext2D;
    sceneData: SceneData;
    view: View;
    elapseTime: number;
}

export interface LayerAndView {
    layer: LayerData;
    view: View;
}

export class SceneDrawHelper {
    public static getActiveLayerAndView(sceneData: SceneData, inactiveLayerIds: string[] = []): LayerAndView[] {
        return sceneData.views.reduce((activeLayers: LayerAndView[], currentView) => {
            currentView.layers
                .forEach((currentLayer: LayerData) => {
                    if (currentLayer.context && !inactiveLayerIds.includes(currentLayer.id)) {
                        activeLayers.push({ layer: currentLayer, view: currentView });
                    }
                });
            return activeLayers;
        }, []);
    }

    public static clearLayers(layers: LayerData[]): void {
        for (const layer of layers) {
            layer.context.clearRect(0, 0, layer.context.canvas.width, layer.context.canvas.height);
        }
    }

    public static renderBackgroundLayers(layerAndViews: LayerAndView[], contextOptions: ContextOptions): void {
        for (const layerAndView of layerAndViews) {
            displayBackground({
                context: layerAndView.layer.context,
                view: layerAndView.view,
                layer: layerAndView.layer,
                contextOptionsDefault: contextOptions,
            });
        }
    }

    public static renderFilterLayers(renderData: RenderData, layerAndViews: LayerAndView[], filterRenders: FilterRenderFunctions): void {
        if (renderData.layerFilters) {
            for (const layerAndView of layerAndViews) {
                const layerContext = layerAndView.layer.context;
                const filtersToApply = renderData.layerFilters.filter(
                    (filter) => (filter.layerId === undefined || layerAndView.layer.id === filter.layerId)
                        && (filter.viewsId === undefined || filter.viewsId.find((viewId) => viewId === layerAndView.view.id)));
                let imageData = layerContext.getImageData(0, 0, layerContext.canvas.width, layerContext.canvas.height);
                filtersToApply.forEach((filter) => {
                    imageData = filterRenders[filter.type]({ imageData, filterData: filter.data });
                });
                layerContext.putImageData(imageData, 0, 0);
            }
        }
    }

    public static drawObject({
        currentObject, sceneData, context, rendererSystem, view,
        elapseTime, objectRenderers, contextOptionsDefault}: any): void {
        if (currentObject.resourceId) {
            const resource = sceneData.resources[currentObject.resourceId];
            SceneDrawHelper.renderObjectByResourceId({
                context,
                currentObject,
                rendererSystem,
                resource,
                sceneData,
                view,
            });
        }

        if (currentObject.renderers) {
            currentObject.renderers.forEach((currentRenderer: ObjectRendererDataParameters) => {
                SceneDrawHelper.computeRenderer(
                    {
                        context,
                        elapseTime,
                        rendererSystem,
                        sceneData,
                        view,
                    },
                    currentObject, objectRenderers, contextOptionsDefault, currentRenderer);
            });
        }
    }

    public static getLayersAndViewForObject(
        layerAndViews: LayerAndView[],
        currentObject: ObjectData): LayerAndView[] {

        return layerAndViews.filter((currLayerAndView: LayerAndView) => currLayerAndView.layer.id === currentObject.layerId);
    }

    private static computeRenderer(
        {rendererSystem, context, view, elapseTime, sceneData}: RenderDataParameters,
        currentObject: any, objectRenderers: any, contextOptionsDefault: ContextOptions,
        currentRenderer: ObjectRendererDataParameters) {

        if (getOrDefault(currentRenderer.visible, true)) {
            const renderObjectFn = objectRenderers[currentRenderer.type];
            if (renderObjectFn) {
                // context.save();
                updateContextOptions({context, currentRenderer, contextOptionsDefault});
                renderObjectFn({rendererSystem, context, view, currentObject, currentRenderer, sceneData, elapseTime});
                // context.restore();
            }
        }
    }

    private static renderObjectByResourceId({rendererSystem, context, sceneData, currentObject, view, resource}
        : {
            rendererSystem: RendererSystem, context: CanvasRenderingContext2D, sceneData: SceneData,
            currentObject: ObjectRender, view: View, resource: any}): void {

        const tilespicture: TilesPicture = rendererSystem.getResource(resource.tilesetId);
        const source = tilespicture.source;
        const objectData = currentObject as any; // TODO: merge objectData AND objectRender
        const sprite = SceneDrawHelper.getSprite(objectData, resource, tilespicture, sceneData);
        if (sprite) {
            Entity2DDrawHelper.drawEntity2D(context, view, objectData, source, sprite);
        }
    }

    private static getSprite(objectData: ObjectData, resource: ResourceData, tilespicture: TilesPicture, sceneData: SceneData)
    : RectangleData | undefined {

        if (resource.type === ResourceType.ANIMATION) {
            const frames = SceneHandler.getAnimationFromResource(sceneData, resource);
            const animationState = objectData.animation;
            return frames !== undefined && animationState !== undefined ? AnimationHandler.getCurrentSprite({
                frames,
                state: animationState,
            }, tilespicture) : undefined;
        } else {
            return tilespicture.getSprite(resource.type === ResourceType.TILE ? resource.tileIndex : 0);
        }
    }
}
