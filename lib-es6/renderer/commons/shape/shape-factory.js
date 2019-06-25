var ShapeFactory = /** @class */ (function () {
    function ShapeFactory() {
    }
    ShapeFactory.createRectangle = function (x, y, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        return {
            position: { x: x, y: y },
            size: {
                x: width,
                y: height,
            },
        };
    };
    ShapeFactory.createRectangleFromVector2DData = function (position, size) {
        return {
            position: position || { x: 0, y: 0 },
            size: size || { x: 0, y: 0 },
        };
    };
    ShapeFactory.createCircle = function (x, y, radius) {
        return {
            position: { x: x, y: y },
            radius: radius,
        };
    };
    ShapeFactory.createCircleFromVector2DData = function (position, radius) {
        return {
            position: position || { x: 0, y: 0 },
            radius: radius !== undefined ? radius : 0,
        };
    };
    return ShapeFactory;
}());
export { ShapeFactory };
//# sourceMappingURL=../../../../src/src/renderer/commons/shape/shape-factory.js.map