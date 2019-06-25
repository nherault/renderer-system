import { Vector2DData } from '../vector-2d/vector-2d.types';
import { CircleData, RectangleData } from './shape.types';
export declare class ShapeFactory {
    static createRectangle(x: number, y: number, width?: number, height?: number): RectangleData;
    static createRectangleFromVector2DData(position?: Vector2DData, size?: Vector2DData): RectangleData;
    static createCircle(x: number, y: number, radius: number): CircleData;
    static createCircleFromVector2DData(position?: Vector2DData, radius?: number): CircleData;
}
