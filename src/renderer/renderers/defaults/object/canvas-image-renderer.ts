import { ObjectRenderParameters } from '../../../render-system.types';
import { computePositionWithVelocity } from '../../../utils';
import { CanvasRendererData, ImageRendererData } from '../../renderer-data.types';

export interface CanvasImageRendererParameters extends ObjectRenderParameters {
    currentRenderer: CanvasRendererData | ImageRendererData;
}

export function renderCanvasImage({context, currentObject, currentRenderer, elapseTime}: CanvasImageRendererParameters): void {
    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    context.drawImage(currentRenderer.source, position.x, position.y);
}
