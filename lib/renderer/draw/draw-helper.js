"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_draw_helper_1 = require("../canvas/canvas-draw-helper");
var shape_factory_1 = require("../commons/shape/shape-factory");
var DrawHelper = /** @class */ (function () {
    function DrawHelper() {
    }
    DrawHelper.clearView = function (context, view) {
        context.clearRect(0, 0, view.size.x, view.size.y);
        return this;
    };
    DrawHelper.clearDisplay = function (displayReferences) {
        displayReferences.context.clearRect(0, 0, displayReferences.view.size.x, displayReferences.view.size.y);
        return this;
    };
    DrawHelper.drawFromSpriteAndView = function (context, view, entity, source, sprite) {
        sprite = sprite || {
            position: { x: 0, y: 0 },
            size: { x: source.width, y: source.height },
        };
        if (DrawHelper.isInView(view, entity)) {
            var sourceX = sprite.position.x;
            var sourceY = sprite.position.y;
            var sourceWidth = sprite.size.x;
            var sourceHeight = sprite.size.y;
            var entityX = (entity.position.x - view.position.x) * view.scale;
            var entityY = (entity.position.y - view.position.y) * view.scale;
            var entityWidth = entity.size.x * view.scale;
            var entityHeight = entity.size.y * view.scale;
            context.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, entityX, entityY, entityWidth, entityHeight);
        }
    };
    DrawHelper.drawFromSprite = function (context, source, sprite, coordx, coordy) {
        context.drawImage(source, sprite.position.x, sprite.position.y, sprite.size.x, sprite.size.y, coordx, coordy, sprite.size.x, sprite.size.y);
        return this;
    };
    DrawHelper.drawFromSpriteAndScale = function (context, source, sprite, coordx, coordy, widthTarget, heightTarget) {
        context.drawImage(source, sprite.position.x, sprite.position.y, sprite.size.x, sprite.size.y, coordx, coordy, widthTarget, heightTarget);
        return this;
    };
    DrawHelper.drawFromSpriteAndScalePercent = function (context, source, sprite, coordx, coordy, percentTarget) {
        context.drawImage(source, sprite.position.x, sprite.position.y, sprite.size.x, sprite.size.y, coordx, coordy, sprite.size.x * percentTarget, sprite.size.y * percentTarget);
        return this;
    };
    DrawHelper.translateIntoView = function (view, source, coordx, coordy) {
        var x = coordx;
        var y = coordy;
        if (!DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(coordx, coordy, source.width, source.height))) {
            if (coordx < view.position.x) {
                x = coordx + Math.round(Math.abs(coordx - view.position.x) / source.width) * source.width;
            }
            else if (coordx > view.position.x) {
                x = coordx - (Math.round(Math.abs(coordx - (view.position.x + view.size.x)) / source.width) + 1) * source.width;
            }
            if (coordy < view.position.y) {
                y = coordy + Math.round(Math.abs(coordy - view.position.y) / source.height) * source.height;
            }
            else if (coordy > view.position.y) {
                y = coordy - (Math.round(Math.abs(coordy - (view.position.y + view.size.y)) / source.height) + 1) * source.height;
            }
        }
        return { x: x, y: y };
    };
    DrawHelper.translateIntoViewX = function (view, source, coordx, coordy) {
        var x = coordx;
        var y = coordy;
        if (!DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(coordx, coordy, source.width, source.height))) {
            if (coordx < view.position.x) {
                x = coordx + Math.round(Math.abs(coordx - view.position.x) / source.width) * source.width;
            }
            else if (coordx > view.position.x) {
                x = coordx - (Math.round(Math.abs(coordx - (view.position.x + view.size.x)) / source.width) + 1) * source.width;
            }
        }
        return { x: x, y: y };
    };
    DrawHelper.translateIntoViewY = function (view, source, coordx, coordy) {
        var x = coordx;
        var y = coordy;
        if (!DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(coordx, coordy, source.width, source.height))) {
            if (coordy < view.position.y) {
                y = coordy + Math.round(Math.abs(coordy - view.position.y) / source.height) * source.height;
            }
            else if (coordy > view.position.y) {
                y = coordy - (Math.round(Math.abs(coordy - (view.position.y + view.size.y)) / source.height) + 1) * source.height;
            }
        }
        return { x: x, y: y };
    };
    DrawHelper.drawFromCanvasRepeatX = function (context, view, source, coordx, coordy, isTranslate) {
        if (isTranslate === void 0) { isTranslate = true; }
        var _a = isTranslate ? DrawHelper.translateIntoViewX(view, source, coordx, coordy) : { x: coordx, y: coordy }, x = _a.x, y = _a.y;
        if (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(x, y, source.width, source.height))) {
            context.drawImage(source, x, y);
            // Draw before
            var currCoordX = x - source.width;
            while (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
                context.drawImage(source, currCoordX, y);
                currCoordX -= source.width;
            }
            // Draw after
            currCoordX = x + source.width;
            while (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
                context.drawImage(source, currCoordX, y);
                currCoordX += source.width;
            }
        }
        return this;
    };
    DrawHelper.drawFromCanvasRepeatY = function (context, view, source, coordx, coordy, isTranslate) {
        if (isTranslate === void 0) { isTranslate = true; }
        var _a = isTranslate ? DrawHelper.translateIntoViewY(view, source, coordx, coordy) : { x: coordx, y: coordy }, x = _a.x, y = _a.y;
        if (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(x, y, source.width, source.height))) {
            context.drawImage(source, x, y);
            // Draw before
            var currCoordY = y - source.height;
            while (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(x, currCoordY, source.width, source.height))) {
                context.drawImage(source, x, currCoordY);
                currCoordY -= source.height;
            }
            // Draw after
            currCoordY = y + source.height;
            while (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(x, currCoordY, source.width, source.height))) {
                context.drawImage(source, x, currCoordY);
                currCoordY += source.height;
            }
        }
        return this;
    };
    DrawHelper.drawFromCanvasRepeat = function (context, view, source, coordx, coordy) {
        var _a = DrawHelper.translateIntoView(view, source, coordx, coordy), x = _a.x, y = _a.y;
        context.drawImage(source, x, y);
        DrawHelper.drawFromCanvasRepeatX(context, view, source, x, y, false);
        DrawHelper.drawFromCanvasRepeatY(context, view, source, x, y, false);
        // Draw before
        var currCoordX = x - source.width;
        while (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
            context.drawImage(source, currCoordX, y);
            DrawHelper.drawFromCanvasRepeatY(context, view, source, currCoordX, y);
            currCoordX -= source.width;
        }
        // Draw after
        currCoordX = x + source.width;
        while (DrawHelper.isInView(view, shape_factory_1.ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
            context.drawImage(source, currCoordX, y);
            DrawHelper.drawFromCanvasRepeatY(context, view, source, currCoordX, y);
            currCoordX += source.width;
        }
        return this;
    };
    DrawHelper.drawFromResource = function (displayReferences, resourceId, rectangle) {
        // TODO: Manage Source image different than desired size
        var result = DrawHelper.calculateRectangleInsideView(displayReferences.view, rectangle);
        if (result != null) {
            canvas_draw_helper_1.Canvas2DDrawHelper.drawFromCanvasClippingAndScale(displayReferences.context, displayReferences.resourceStore.getResource(resourceId), result.coord.x, result.coord.y, result.rect);
        }
        return this;
    };
    DrawHelper.isInView = function (view, rectangle) {
        // Move the coordinate to display depends of the view.
        var _a = DrawHelper.calculateViewCoordinate(rectangle.position, view), x = _a.x, y = _a.y;
        // Check if part of it is inside the view
        return !(x > view.size.x || y > view.size.y || x + rectangle.size.x < 0 || y + rectangle.size.y < 0);
    };
    DrawHelper.calculateRectangleInsideView = function (view, rectangle) {
        // Move the coordinate to display depends of the view.
        var _a = DrawHelper.calculateViewCoordinate(rectangle.position, view), x = _a.x, y = _a.y;
        // Check if part of it is inside the view
        if (x > view.size.x || y > view.size.y || x + rectangle.size.x < 0 || y + rectangle.size.y < 0) {
            return undefined;
        }
        // Calculate the coordinate inside the view
        var coordXInView = Math.floor(Math.max(x, view.position.x));
        var coordYInView = Math.floor(Math.max(y, view.position.y));
        var resultClipping = shape_factory_1.ShapeFactory.createRectangle(0, 0, rectangle.size.x, rectangle.size.y);
        // Calculate the clipping
        if (rectangle.position.x < view.position.x) {
            resultClipping.position.x = view.position.x - rectangle.position.x;
            resultClipping.size.x -= resultClipping.position.x;
        }
        if (rectangle.position.y < view.position.y) {
            resultClipping.position.y = view.position.y - rectangle.position.y;
            resultClipping.size.y -= resultClipping.position.y;
        }
        if (coordXInView + resultClipping.size.x > view.size.x) {
            resultClipping.size.x = view.size.x - coordXInView;
        }
        if (coordYInView + resultClipping.size.y > view.size.y) {
            resultClipping.size.y = view.size.y - coordYInView;
        }
        return { coord: { x: coordXInView, y: coordYInView }, rect: resultClipping };
    };
    DrawHelper.intersect = function (a, b) {
        var x = Math.max(a.position.x, b.position.x);
        var num1 = Math.min(a.position.x + a.size.x, b.position.x + b.size.x);
        var y = Math.max(a.position.y, b.position.y);
        var num2 = Math.min(a.position.y + a.size.x, b.position.y + b.size.y);
        return num1 >= x && num2 >= y
            ? {
                position: { x: x, y: y },
                size: {
                    x: num1 - x,
                    y: num2 - y,
                },
            }
            : undefined;
    };
    DrawHelper.calculateViewCoordinate = function (entity, view) {
        var x = entity.x - view.position.x;
        var y = entity.y - view.position.y;
        return { x: x, y: y };
    };
    DrawHelper.drawRectangle = function (context, rectangleData, options) {
        // Options
        var strokeStyle = (options && options.strokeStyle) || 'red';
        var isStroke = (options && options.isStroke) || true;
        var fillStyle = (options && options.fillStyle) || 'red';
        var isFill = (options && options.isFill) || false;
        if (isStroke) {
            context.strokeStyle = strokeStyle;
        }
        if (isFill) {
            context.fillStyle = fillStyle;
        }
        context.rect(rectangleData.position.x, rectangleData.position.y, rectangleData.size.x, rectangleData.size.y);
        if (isStroke) {
            context.stroke();
        }
        if (isFill) {
            context.fill();
        }
    };
    DrawHelper.drawCircle = function (context, circleData, options) {
        // Options
        var strokeStyle = (options && options.strokeStyle) || 'red';
        var isStroke = (options && options.isStroke) || true;
        var fillStyle = (options && options.fillStyle) || 'red';
        var isFill = (options && options.isFill) || false;
        if (isStroke) {
            context.strokeStyle = strokeStyle;
        }
        if (isFill) {
            context.fillStyle = fillStyle;
        }
        context.arc(circleData.position.x, circleData.position.y, circleData.radius, 0, 2 * Math.PI, false);
        if (isStroke) {
            context.stroke();
        }
        if (isFill) {
            context.fill();
        }
    };
    return DrawHelper;
}());
exports.DrawHelper = DrawHelper;
//# sourceMappingURL=../../../src/src/renderer/draw/draw-helper.js.map