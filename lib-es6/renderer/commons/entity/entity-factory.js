import { ShapeFactory } from '../shape/shape-factory';
var Entity2DFactory = /** @class */ (function () {
    function Entity2DFactory() {
    }
    Entity2DFactory.create = function (position, velocity, size, acceleration) {
        var entity2DData = ShapeFactory.createRectangleFromVector2DData(position, size);
        entity2DData.velocity = velocity || { x: 0, y: 0 };
        entity2DData.acceleration = acceleration || { x: 0, y: 0 };
        return entity2DData;
    };
    return Entity2DFactory;
}());
export { Entity2DFactory };
//# sourceMappingURL=../../../../src/src/renderer/commons/entity/entity-factory.js.map