import { computePositionWithVelocity } from '../../..';
import { computeOrDefault } from '../../../../utils/utils';
import { ObjectRenderParameters } from '../../../render-system.types';
import { computeStrokeFill } from '../../../utils';
import { TriangleRendererData } from '../../renderer-data.types';

export interface TriangleRendererParameters extends ObjectRenderParameters {
    currentRenderer: TriangleRendererData;
}

export function renderTriangle({context, currentObject, currentRenderer, elapseTime}: TriangleRendererParameters): void {

    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    const offsetPositionX = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.x, 0);
    const offsetPositionY = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.y, 0);
    const [x, y] = [position.x, position.y];

    context.beginPath();
    context.moveTo(x + offsetPositionX + currentObject.size.x / 2, y + offsetPositionY);
    context.lineTo(x + offsetPositionX, y + offsetPositionY + currentObject.size.y);
    context.lineTo(x + offsetPositionX + currentObject.size.x, y + offsetPositionY + currentObject.size.y);
    context.lineTo(x + offsetPositionX + currentObject.size.x / 2, y + offsetPositionY);
    context.closePath();

    computeStrokeFill(currentRenderer,
        () => context.stroke(),
        () => context.fill(),
    );
}
