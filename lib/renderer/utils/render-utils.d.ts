import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { View } from '../commons/view/view.types';
import { ContextOptions } from '../renderers';
import { LayerData } from '../scene/scene.types';
export declare const computeStrokeFill: (strokeFillOptions: {
    stroke?: boolean | undefined;
    fill?: boolean | undefined;
}, strokeFunction: () => void, fillFunction: () => void) => void;
export declare const computePositionWithOffset: (position: Vector2DData, offset: {
    x?: number | undefined;
    y?: number | undefined;
}) => {
    x: any;
    y: any;
};
export declare const computePositionWithVelocity: (position: Vector2DData, elapsedTime: number, velocity?: Vector2DData | undefined) => any;
export declare function displayBackground({ context, view, layer, contextOptionsDefault }: {
    context: CanvasRenderingContext2D;
    view: View;
    layer: LayerData;
    contextOptionsDefault: ContextOptions;
}): void;
