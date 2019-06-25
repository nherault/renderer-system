import { Vector2DData } from '../../../commons/vector-2d/vector-2d.types';
import { ObjectRenderParameters } from '../../../render-system.types';
import { Forms2D, Path2DRendererData } from '../../renderer-data.types';
export declare function renderPath2DOptions({ context, path2D, offsetPosition, scale, strokeFillOptions }: {
    context: CanvasRenderingContext2D;
    path2D: Forms2D[];
    offsetPosition: Vector2DData;
    scale: Vector2DData;
    strokeFillOptions: {
        stroke?: boolean;
        fill?: boolean;
    };
}): void;
export interface Path2DRendererParameters extends ObjectRenderParameters {
    currentRenderer: Path2DRendererData;
}
export declare function renderPath2D({ context, currentObject, currentRenderer, elapseTime }: Path2DRendererParameters): void;
export declare const calculatePath2DContainerSize: (path: Forms2D[]) => {
    width: number;
    height: number;
};
