"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../../utils/utils");
var utils_2 = require("../../../utils");
var renderer_data_types_1 = require("../../renderer-data.types");
function renderPath2DOptions(_a) {
    var context = _a.context, path2D = _a.path2D, offsetPosition = _a.offsetPosition, scale = _a.scale, strokeFillOptions = _a.strokeFillOptions;
    var _b = [offsetPosition.x, offsetPosition.y], x = _b[0], y = _b[1];
    var _c = [scale.x, scale.y], scaleX = _c[0], scaleY = _c[1];
    context.beginPath();
    context.moveTo(x, y);
    path2D.forEach(function (currPath) {
        if (currPath.type === renderer_data_types_1.PATH_DATA.LINE_TO) {
            context.lineTo(x + currPath.to.x * scaleX, y + currPath.to.y * scaleY);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.ARC) {
            var radius = currPath.radius * (scaleX + scaleY) / 2;
            context.arc(x, y, radius, utils_1.degToRad(currPath.startAngle), utils_1.degToRad(currPath.endAngle));
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.ARC_TO) {
            var _a = [currPath.from.x * scaleX, currPath.from.y * scaleY], fromX = _a[0], fromY = _a[1];
            var _b = [currPath.to.x * scaleX, currPath.to.y * scaleY], toX = _b[0], toY = _b[1];
            var radius = currPath.radius * (scaleX + scaleY) / 2;
            context.arcTo(x + fromX, y + fromY, x + toX, x + toY, radius);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.RECTANGLE) {
            var _c = [currPath.position.x * scaleX, currPath.position.y * scaleY], positionX = _c[0], positionY = _c[1];
            var _d = [currPath.size.x * scaleX, currPath.size.y * scaleY], sizeX = _d[0], sizeY = _d[1];
            context.rect(x + positionX, y + positionY, x + positionX + sizeX, y + positionY + sizeY);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.BEZIER_CURVE_TO) {
            var _e = [currPath.cp1.x * scaleX, currPath.cp1.y * scaleY], cp1X = _e[0], cp1Y = _e[1];
            var _f = [currPath.cp2.x * scaleX, currPath.cp2.y * scaleY], cp2X = _f[0], cp2Y = _f[1];
            var _g = [currPath.end.x * scaleX, currPath.end.y * scaleY], endX = _g[0], endY = _g[1];
            context.bezierCurveTo(x + cp1X, y + cp1Y, x + cp2X, y + cp2Y, x + endX, y + endY);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.QUADRIC_CURVE_TO) {
            var _h = [currPath.cp.x * scaleX, currPath.cp.y * scaleY], cpX = _h[0], cpY = _h[1];
            var _j = [currPath.end.x * scaleX, currPath.end.y * scaleY], endX = _j[0], endY = _j[1];
            context.quadraticCurveTo(x + cpX, y + cpY, x + endX, y + endY);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.MOVE_TO) {
            var _k = [currPath.to.x * scaleX, currPath.to.y * scaleY], toX = _k[0], toY = _k[1];
            context.moveTo(x + toX, y + toY);
        }
    });
    context.closePath();
    utils_2.computeStrokeFill(strokeFillOptions, function () { return context.stroke(); }, function () { return context.fill(); });
}
exports.renderPath2DOptions = renderPath2DOptions;
function renderPath2D(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, elapseTime = _a.elapseTime;
    var position = utils_2.computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    var _b = [position.x, position.y], x = _b[0], y = _b[1];
    var _c = exports.calculatePath2DContainerSize(currentRenderer.path), width = _c.width, height = _c.height;
    var _d = [currentObject.size.x / width, currentObject.size.y / height], scaleX = _d[0], scaleY = _d[1];
    renderPath2DOptions({
        context: context, offsetPosition: { x: x, y: y }, path2D: currentRenderer.path,
        scale: { x: scaleX, y: scaleY }, strokeFillOptions: currentRenderer
    });
}
exports.renderPath2D = renderPath2D;
exports.calculatePath2DContainerSize = function (path) {
    var minX = 0;
    var minY = 0;
    var maxX = 0;
    var maxY = 0;
    path.forEach(function (currPath) {
        if (currPath.type === renderer_data_types_1.PATH_DATA.LINE_TO) {
            minX = Math.min(minX, currPath.to.x);
            minY = Math.min(minY, currPath.to.y);
            maxX = Math.max(maxX, currPath.to.x);
            maxY = Math.max(maxY, currPath.to.y);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.ARC) {
            minX = Math.min(minX, currPath.position.x - currPath.radius);
            minY = Math.min(minY, currPath.position.y - currPath.radius);
            maxX = Math.max(maxX, currPath.position.x + currPath.radius);
            maxY = Math.max(maxY, currPath.position.y + currPath.radius);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.ARC_TO) {
            minX = Math.min(minX, currPath.from.x - currPath.radius);
            minY = Math.min(minY, currPath.from.y - currPath.radius);
            maxX = Math.max(maxX, currPath.from.x + currPath.radius);
            maxY = Math.max(maxY, currPath.from.y + currPath.radius);
            minX = Math.min(minX, currPath.to.x - currPath.radius);
            minY = Math.min(minY, currPath.to.y - currPath.radius);
            maxX = Math.max(maxX, currPath.to.x + currPath.radius);
            maxY = Math.max(maxY, currPath.to.y + currPath.radius);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.RECTANGLE) {
            minX = Math.min(minX, currPath.position.x);
            minY = Math.min(minY, currPath.position.y);
            maxX = Math.max(maxX, currPath.position.x + currPath.size.x);
            maxY = Math.max(maxY, currPath.position.y + currPath.size.y);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.BEZIER_CURVE_TO) {
            minX = Math.min(minX, currPath.cp1.x);
            minY = Math.min(minY, currPath.cp1.y);
            maxX = Math.max(maxX, currPath.cp1.x);
            maxY = Math.max(maxY, currPath.cp1.y);
            minX = Math.min(minX, currPath.cp2.x);
            minY = Math.min(minY, currPath.cp2.y);
            maxX = Math.max(maxX, currPath.cp2.x);
            maxY = Math.max(maxY, currPath.cp2.y);
            minX = Math.min(minX, currPath.end.x);
            minY = Math.min(minY, currPath.end.y);
            maxX = Math.max(maxX, currPath.end.x);
            maxY = Math.max(maxY, currPath.end.y);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.QUADRIC_CURVE_TO) {
            minX = Math.min(minX, currPath.cp.x);
            minY = Math.min(minY, currPath.cp.y);
            maxX = Math.max(maxX, currPath.cp.x);
            maxY = Math.max(maxY, currPath.cp.y);
            minX = Math.min(minX, currPath.end.x);
            minY = Math.min(minY, currPath.end.y);
            maxX = Math.max(maxX, currPath.end.x);
            maxY = Math.max(maxY, currPath.end.y);
        }
        else if (currPath.type === renderer_data_types_1.PATH_DATA.MOVE_TO) {
            minX = Math.min(minX, currPath.to.x);
            minY = Math.min(minY, currPath.to.y);
            maxX = Math.max(maxX, currPath.to.x);
            maxY = Math.max(maxY, currPath.to.y);
        }
    });
    return { width: maxX - minX, height: maxY - minY };
};
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/path2d-renderer.js.map