import { RectangleData } from '../shape/shape.types';
import { Vector2DData } from '../vector-2d/vector-2d.types';
export interface Entity2DData extends RectangleData {
    velocity?: Vector2DData;
    acceleration?: Vector2DData;
    rotation?: number;
    horizontalFlip?: boolean;
    verticalFlip?: boolean;
}
