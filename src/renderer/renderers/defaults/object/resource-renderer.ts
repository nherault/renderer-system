import { RectangleData } from '../../../commons/shape/shape.types';
import { Entity2DDrawHelper } from '../../../draw/entity-2d-draw-helper';
import { ObjectRenderParameters } from '../../../render-system.types';
import { SceneHandler } from '../../../scene/scene-handler';
import { ObjectData, ResourceData, ResourceType, SceneData } from '../../../scene/scene.types';
import { AnimationHandler } from '../../../tiles/animation-handler';
import { TilesPicture } from '../../../tiles/tiles-picture';
import { ResourceRendererData } from '../../renderer-data.types';

export interface ResourceRendererParameters extends ObjectRenderParameters {
    currentRenderer: ResourceRendererData;
}

export function renderResource({rendererSystem, context, currentObject, currentRenderer, view, sceneData}
    : ResourceRendererParameters): void {
        const tilespicture: TilesPicture = rendererSystem.getResource(currentRenderer.resourceId);
        const resource: ResourceData = sceneData.resources[currentRenderer.resourceId];
        if (tilespicture && resource) {
            const source = tilespicture.source;
            const objectData = currentObject as any; // TODO: merge objectData AND objectRender
            const sprite = getSprite(objectData, resource, tilespicture, sceneData);
            if (sprite) {
                Entity2DDrawHelper.drawEntity2D(context, view, objectData, source, sprite);
            }
            /*
            const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
            context.drawImage(resource,
                0, 0, resource.width, resource.height,
                position.x, position.y, currentObject.size.x, currentObject.size.y);
                */
        }
}

function getSprite(objectData: ObjectData, resource: ResourceData, tilespicture: TilesPicture, renderState: SceneData)
    : RectangleData | undefined {

    if (resource.type === ResourceType.ANIMATION) {
        const frames = SceneHandler.getAnimationFromResource(renderState, resource);
        const animationState = objectData.animation;
        return frames !== undefined && animationState !== undefined ? AnimationHandler.getCurrentSprite({
            frames,
            state: animationState,
        }, tilespicture) : undefined;
    } else {
        return tilespicture.getSprite(resource.type === ResourceType.TILE ? resource.tileIndex : 0);
    }
}
