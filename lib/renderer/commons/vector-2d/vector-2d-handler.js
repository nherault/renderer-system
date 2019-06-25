"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2DHandler = /** @class */ (function () {
    function Vector2DHandler() {
    }
    Vector2DHandler.sAngle = function (v1, v2) {
        return Math.acos(Vector2DHandler.sDot(Vector2DHandler.sNormalize(Vector2DHandler.sClone(v1)), Vector2DHandler.sNormalize(Vector2DHandler.sClone(v2))));
    };
    Vector2DHandler.sClone = function (v) {
        return { x: v.x, y: v.y };
    };
    Vector2DHandler.sFromAngleDegree = function (angleInDegree) {
        return { x: Math.sin(angleInDegree * Math.PI / 180), y: Math.cos(angleInDegree * Math.PI / 180) };
    };
    Vector2DHandler.sReverse = function (v) {
        v.x = -v.x;
        v.y = -v.y;
        return v;
    };
    Vector2DHandler.sRotate = function (v, angle, center) {
        if (center === void 0) { center = { x: 0, y: 0 }; }
        var x1 = v.x - center.x;
        var y1 = v.y - center.y;
        var x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
        var y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);
        v.x = x2 + center.x;
        v.y = y2 + center.y;
        return v;
    };
    Vector2DHandler.sRotate90 = function (v, clockwise) {
        if (clockwise === void 0) { clockwise = true; }
        if (clockwise) {
            v.x = v.y;
            v.y = -v.x;
        }
        else {
            v.x = -v.y;
            v.y = v.x;
        }
        return v;
    };
    Vector2DHandler.sDot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    Vector2DHandler.sNormalize = function (v) {
        var length = Vector2DHandler.sLength(v);
        if (length !== 0) {
            v.x = v.x / length;
            v.y = v.y / length;
        }
        else {
            v.x = 0;
            v.y = 0;
        }
        return v;
    };
    Vector2DHandler.sLength = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };
    Vector2DHandler.sDistance = function (p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    };
    Vector2DHandler.sAdd = function (v1, v2) {
        v1.x = v1.x + v2.x;
        v1.y = v1.y + v2.y;
        return v1;
    };
    Vector2DHandler.sSubstract = function (v1, v2) {
        v1.x = v1.x - v2.x;
        v1.y = v1.y - v2.y;
        return v1;
    };
    Vector2DHandler.sMultiply = function (v1, scalar) {
        v1.x = v1.x * scalar;
        v1.y = v1.y * scalar;
        return v1;
    };
    Vector2DHandler.sEquals = function (v1, v2) {
        return v1.x === v2.x && v1.y === v2.y;
    };
    return Vector2DHandler;
}());
exports.Vector2DHandler = Vector2DHandler;
//# sourceMappingURL=../../../../src/src/renderer/commons/vector-2d/vector-2d-handler.js.map