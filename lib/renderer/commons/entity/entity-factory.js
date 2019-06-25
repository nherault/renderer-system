"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_factory_1 = require("../shape/shape-factory");
var Entity2DFactory = /** @class */ (function () {
    function Entity2DFactory() {
    }
    Entity2DFactory.create = function (position, velocity, size, acceleration) {
        var entity2DData = shape_factory_1.ShapeFactory.createRectangleFromVector2DData(position, size);
        entity2DData.velocity = velocity || { x: 0, y: 0 };
        entity2DData.acceleration = acceleration || { x: 0, y: 0 };
        return entity2DData;
    };
    return Entity2DFactory;
}());
exports.Entity2DFactory = Entity2DFactory;
//# sourceMappingURL=../../../../src/src/renderer/commons/entity/entity-factory.js.map