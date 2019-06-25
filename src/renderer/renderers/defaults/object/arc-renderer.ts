import { computeOrDefault, degToRad, getOrDefault } from '../../../../utils/utils';
import { ObjectRenderParameters } from '../../../render-system.types';
import { computePositionWithVelocity, computeStrokeFill } from '../../../utils';
import { ArcRendererData } from '../../renderer-data.types';

export interface ArcRendererParameters extends ObjectRenderParameters {
    currentRenderer: ArcRendererData;
}

export function renderArc({context, currentObject, currentRenderer, elapseTime}: ArcRendererParameters): void {

    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    const offsetPositionX = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.x, 0);
    const offsetPositionY = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.y, 0);
    const radius = getOrDefault(currentRenderer.radius, (currentObject.size.x + currentObject.size.y) / 4);
    const [x, y] = [position.x, position.y];

    const startAngle = getOrDefault(currentRenderer.startAngle, 0);
    const endAngle = getOrDefault(currentRenderer.endAngle, 360);
    context.beginPath();
    context.arc(x + offsetPositionX + radius, y + offsetPositionY + radius, radius,
        degToRad(startAngle), degToRad(endAngle));
    context.closePath();
    computeStrokeFill(currentRenderer, () => context.stroke(), () => context.fill());
}
