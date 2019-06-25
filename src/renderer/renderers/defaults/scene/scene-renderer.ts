import { ObjectRenderer, SceneRenderDataParameters } from '../../../render-system.types';
import { getOrDefault } from '../../../../utils/utils';
import { ViewHandler } from '../../../commons/view/view-handler';
import { SceneDrawHelper } from '../../../draw/scene-draw-helper';
import { Entity2DDrawHelper } from '../../../draw/entity-2d-draw-helper';
import { ObjectFilter, SceneData, View } from '../../../scene/scene.types';
import { RepeaterManager } from '../../../../utils/repeater/repeater-manager';

export function sceneRenderer({rendererSystem, sceneData, renderData, elapseTime}: SceneRenderDataParameters): void {
    const filterRenders = rendererSystem.getFilterRenderers();
    const contextOptionsDefault = rendererSystem.getContextOptions();
    const objectRenderers = rendererSystem.getObjectRenderers();
    const repeaterManager = rendererSystem.getRepeaterManager();

    const inactiveLayerIds = tickAndGetExceptionLayerIds(sceneData, repeaterManager, elapseTime);
    const layerAndViews = SceneDrawHelper.getActiveLayerAndView(sceneData, inactiveLayerIds);
    if (layerAndViews.length === 0) {
        return;
    }

    // Clear layers
    SceneDrawHelper.clearLayers(layerAndViews.map((layerAndView) => layerAndView.layer));

    SceneDrawHelper.renderBackgroundLayers(layerAndViews, contextOptionsDefault);

    // Display entities
    for (const objectData of renderData.objects) {
        const currentObject = objectData as ObjectRenderer;
        const currentObjectLayerAndViews = SceneDrawHelper.getLayersAndViewForObject(layerAndViews, objectData);
        currentObjectLayerAndViews.forEach((layerAndView) => {
            const view = layerAndView.view;
            if (ViewHandler.isInViewData(view, objectData)) {
                if (currentObject && getOrDefault(currentObject.visible, true)) {
                    if (currentObject.filters) {
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = currentObject.size.x;
                        tempCanvas.height = currentObject.size.y;
                        const tempContext = tempCanvas.getContext('2d');

                        if (tempContext !== null) {
                            SceneDrawHelper.drawObject({
                                context: tempContext,
                                contextOptionsDefault,
                                currentObject: {
                                    ...currentObject,
                                    position: { x: 0, y: 0},
                                },
                                elapseTime,
                                objectRenderers,
                                rendererSystem,
                                sceneData,
                                view: {
                                    position: { x: 0, y: 0},
                                    size: currentObject.size,
                                    scale: 1.0,
                                } });
                            let imageData = tempContext.getImageData(0, 0, tempContext.canvas.width, tempContext.canvas.height);
                            currentObject.filters.forEach((filter: ObjectFilter) => {
                               imageData = filterRenders[filter.type]({ imageData, filterData: filter.data });
                            });
                            tempContext.putImageData(imageData, 0, 0);
                            Entity2DDrawHelper.drawEntity2D(
                                layerAndView.layer.context,
                                view,
                                objectData,
                                tempCanvas);
                        }
                    } else {
                        SceneDrawHelper.drawObject({
                            context: layerAndView.layer.context,
                            contextOptionsDefault,
                            currentObject,
                            elapseTime,
                            objectRenderers,
                            rendererSystem,
                            sceneData,
                            view });
                    }
                }
            }
        });
    }

    // Filters on layers:
    SceneDrawHelper.renderFilterLayers(renderData, layerAndViews, filterRenders);
}

function tickAndGetExceptionLayerIds(sceneData: SceneData, repeaterManager: RepeaterManager, elapseTime: number): string[] {
    return sceneData.views.reduce(
        (exceptionLayerIds: string[], currentView: View) => {
            currentView.layers.forEach((currentLayer) => {
                const isToDisplay = repeaterManager.tick(currentLayer, elapseTime);
                if (!isToDisplay) {
                    exceptionLayerIds.push(currentLayer.id);
                }
            });
            return exceptionLayerIds;
    }, []);
}
