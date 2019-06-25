import { computeOrDefault, getOrDefault } from '../../../../utils/utils';
import { ObjectRenderParameters } from '../../../render-system.types';
import { computePositionWithVelocity, computeStrokeFill } from '../../../utils';
import { CircleRendererData } from '../../renderer-data.types';

export interface CircleRendererParameters extends ObjectRenderParameters {
    currentRenderer: CircleRendererData;
}

export function renderCircle({context, currentObject, currentRenderer, elapseTime}: CircleRendererParameters): void {

    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    const offsetPositionX = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.x, 0);
    const offsetPositionY = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.y, 0);
    const radius = getOrDefault(currentRenderer.radius, (currentObject.size.x + currentObject.size.y) / 4);
    const [x, y] = [position.x, position.y];

    context.beginPath();
    context.arc(x + offsetPositionX + radius, y + offsetPositionY + radius, radius, 0, 2 * Math.PI);
    context.closePath();
    computeStrokeFill(currentRenderer, () => context.stroke(), () => context.fill());
}
