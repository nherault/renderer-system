import { Vector2DData } from './vector-2d.types';

export class Vector2DFactory {

    public static create(x: number, y: number): Vector2DData {
        return {x, y};
    }
}
