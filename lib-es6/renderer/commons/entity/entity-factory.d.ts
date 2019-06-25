import { Vector2DData } from '../vector-2d/vector-2d.types';
import { Entity2DData } from './entity.types';
export declare class Entity2DFactory {
    static create(position?: Vector2DData, velocity?: Vector2DData, size?: Vector2DData, acceleration?: Vector2DData): Entity2DData;
}
