import { ShapeFactory } from '../shape/shape-factory';
import { Vector2DData } from '../vector-2d/vector-2d.types';
import { Entity2DData } from './entity.types';

export class Entity2DFactory {

    public static create(
        position?: Vector2DData, velocity?: Vector2DData,
        size?: Vector2DData, acceleration?: Vector2DData): Entity2DData {
        const entity2DData = ShapeFactory.createRectangleFromVector2DData(position, size) as Entity2DData;
        entity2DData.velocity = velocity || {x: 0, y: 0};
        entity2DData.acceleration = acceleration || {x: 0, y: 0};
        return entity2DData;
    }
}
