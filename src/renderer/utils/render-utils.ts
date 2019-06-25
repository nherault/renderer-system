import { computeOrDefault, getOrDefault } from '../../utils/utils';
import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { ContextOptions } from '../renderers';
import { LayerData, View } from '../scene/scene.types';
import { updateContextOptions } from './context-options-utils';

export const computeStrokeFill = (
    strokeFillOptions: {stroke?: boolean, fill?: boolean},
    strokeFunction: () => void, fillFunction: () => void) => {
    if (strokeFillOptions.stroke) {
        strokeFunction();
    }
    if (strokeFillOptions.fill || !strokeFillOptions.stroke) {
        fillFunction();
    }
};

export const computePositionWithOffset = (position: Vector2DData, offset: {x?: number, y?: number}) => {
    return {x: position.x + getOrDefault(offset.x, 0), y: position.y + getOrDefault(offset.y, 0)};
};

export const computePositionWithVelocity = (position: Vector2DData, elapsedTime: number, velocity?: Vector2DData) => {
    return computeOrDefault(velocity, (currVelocity) => ({
        x: position.x + currVelocity.x * elapsedTime,
        y: position.y + currVelocity.y * elapsedTime,
    }), position);
};

export function displayBackground({context, view, layer, contextOptionsDefault}:
    {context: CanvasRenderingContext2D, view: View, layer: LayerData, contextOptionsDefault: ContextOptions}): void {
    if ((layer as any).backgroundColor !== undefined) {
        updateContextOptions({context, currentRenderer: layer, contextOptionsDefault});
        context.fillStyle = (layer as any).backgroundColor;
        context.fillRect(0, 0, view.size.x, view.size.y);
    }
}
