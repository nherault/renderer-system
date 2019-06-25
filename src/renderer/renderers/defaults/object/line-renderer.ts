import { computeOrDefault } from '../../../../utils/utils';
import { ObjectRenderParameters } from '../../../render-system.types';
import { computePositionWithVelocity } from '../../../utils';
import { LineRendererData } from '../../renderer-data.types';

export interface LineRendererParameters extends ObjectRenderParameters {
    currentRenderer: LineRendererData;
}

export function renderLine({context, currentObject, currentRenderer, elapseTime}: LineRendererParameters): void {

    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    const offsetStartX = computeOrDefault(currentRenderer.offsetStart, (offsetStart) => offsetStart.x, 0);
    const offsetStartY = computeOrDefault(currentRenderer.offsetStart, (offsetStart) => offsetStart.y, 0);
    const offsetEndX = computeOrDefault(currentRenderer.offsetEnd, (offsetEnd) => offsetEnd.x, 0);
    const offsetEndY = computeOrDefault(currentRenderer.offsetEnd, (offsetEnd) => offsetEnd.y, 0);
    const [x, y] = [position.x, position.y];

    context.beginPath();
    context.moveTo(x + offsetStartX, y + offsetStartY);
    context.lineTo(x + currentObject.size.x - offsetEndX, y + currentObject.size.y - offsetEndY);
    context.closePath();
    context.stroke();
    context.fill();
}
