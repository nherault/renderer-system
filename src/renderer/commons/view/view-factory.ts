import { ViewData } from './view.types';
import { Vector2DData } from '../vector-2d/vector-2d.types';

export class ViewFactory {
    public static createView({ position, size, scale }: { position?: Vector2DData, size: Vector2DData, scale: number }): ViewData {
        return {
            position: position !== undefined ? position : { x: 0, y: 0},
            size,
            scale: scale !== undefined ? scale : 1.0,
        };
    }
}
