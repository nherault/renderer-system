import { Vector2DData } from '../vector-2d/vector-2d.types';
import { CircleData, RectangleData } from './shape.types';

export class ShapeFactory {

    public static createRectangle(x: number, y: number, width: number = 0, height: number = 0): RectangleData {
      return {
            position: {x, y},
            size: {
              x: width,
              y: height,
            },
          };
    }

    public static createRectangleFromVector2DData(position?: Vector2DData, size?: Vector2DData): RectangleData {
      return {
            position: position || {x: 0, y: 0},
            size: size || {x: 0, y: 0},
          };
    }

    public static createCircle(x: number, y: number, radius: number): CircleData {
        return {
              position: {x, y},
              radius,
            };
      }

    public static createCircleFromVector2DData(position?: Vector2DData, radius?: number): CircleData {
        return {
              position: position || {x: 0, y: 0},
              radius: radius !== undefined ? radius : 0,
            };
      }
  }
