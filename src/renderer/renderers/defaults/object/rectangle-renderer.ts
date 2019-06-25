import { computeOrDefault } from '../../../../utils/utils';
import { ObjectRenderParameters } from '../../../render-system.types';
import { computePositionWithVelocity, computeStrokeFill } from '../../../utils';
import { RectangleRendererData } from '../../renderer-data.types';

export interface RectangleRendererParameters extends ObjectRenderParameters {
    currentRenderer: RectangleRendererData;
}

export function renderRectangle({context, currentObject, currentRenderer, elapseTime}: RectangleRendererParameters): void {

    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    const offsetPositionX = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.x, 0);
    const offsetPositionY = computeOrDefault(currentRenderer.offsetPosition, (offsetPosition) => offsetPosition.y, 0);
    const sizeX = computeOrDefault(currentRenderer.size, (size) => size.x, currentObject.size.x);
    const sizeY = computeOrDefault(currentRenderer.size, (size) => size.y, currentObject.size.y);
    const [x, y] = [position.x, position.y];

    computeStrokeFill(currentRenderer,
        () => context.strokeRect(x + offsetPositionX, y + offsetPositionY, sizeX, sizeY),
        () => context.fillRect(x + offsetPositionX, y + offsetPositionY, sizeX, sizeY),
    );
}
