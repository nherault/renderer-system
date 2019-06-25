"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_draw_helper_1 = require("../canvas/canvas-draw-helper");
var canvas_factory_1 = require("../canvas/canvas-factory");
var draw_helper_1 = require("./draw-helper");
var Entity2DDrawHelper = /** @class */ (function () {
    function Entity2DDrawHelper() {
    }
    Entity2DDrawHelper.drawFromEntity2D = function (displayReferences, resourceId, entities) {
        // TODO: use the direction to get the correct resource or use the rotation canvas
        var source = displayReferences.resourceStore.getResource(resourceId);
        if (source) {
            if (entities instanceof Array) {
                entities.forEach(function (entity) {
                    draw_helper_1.DrawHelper.drawFromSpriteAndView(displayReferences.context, displayReferences.view, entity, source);
                });
            }
            else {
                draw_helper_1.DrawHelper.drawFromSpriteAndView(displayReferences.context, displayReferences.view, entities, source);
            }
        }
        return this;
    };
    Entity2DDrawHelper.drawFromEntity2DMix = function (displayReferences, resourceIdFinder, entities) {
        // TODO: rotation / flip
        if (entities instanceof Array) {
            entities.forEach(function (entity) {
                Entity2DDrawHelper.drawWithResourceIdFinder(entity, displayReferences, resourceIdFinder);
            });
        }
        else {
            Entity2DDrawHelper.drawWithResourceIdFinder(entities, displayReferences, resourceIdFinder);
        }
        return this;
    };
    Entity2DDrawHelper.drawEntity2D = function (context, view, entity, source, sprite) {
        if (entity.rotation !== undefined && entity.rotation !== null && entity.rotation !== 0) {
            if (entity.horizontalFlip || entity.verticalFlip) {
                Entity2DDrawHelper.flipAndRotateImage(context, entity, source, sprite);
            }
            else {
                Entity2DDrawHelper.rotateImage(context, entity, source, sprite);
            }
        }
        else if (entity.horizontalFlip || entity.verticalFlip) {
            Entity2DDrawHelper.flipImage(context, entity, source, sprite);
        }
        else {
            draw_helper_1.DrawHelper.drawFromSpriteAndView(context, view, entity, source, sprite);
        }
    };
    Entity2DDrawHelper.isInsideView = function (entity, view) {
        return view.position.x < entity.position.x + entity.size.x &&
            view.position.x + view.size.x > entity.position.x &&
            view.position.y < entity.position.y + entity.size.y &&
            view.size.y + view.position.y > entity.position.y;
    };
    /*
    static isInsideView(entity: Entity2DData, view: RectangleData): boolean {
      return entity.position.x - view.position.x > 0
        && entity.position.x - view.position.x < view.size.x
        && entity.position.y - view.position.y > 0
        && entity.position.y - view.position.y < view.size.y;
    }
    */
    // TODO: VIEW SCALE
    // TODO: not perfect rotation => position of the object is not correct at the end !
    Entity2DDrawHelper.rotateImage = function (context, entity, source, sprite) {
        context.save();
        // Convert degrees to radian
        var rad = entity.rotation !== undefined ? entity.rotation * Math.PI / 180 : 0;
        // Set the origin to the center of the image
        var diagonal = Math.sqrt(Math.pow(entity.size.x, 2) + Math.pow(entity.size.y, 2));
        context.translate(entity.position.x + diagonal / 2, entity.position.y + diagonal / 2);
        // Rotate the canvas around the origin
        context.rotate(rad);
        // draw the image
        draw_helper_1.DrawHelper.drawFromSpriteAndScale(context, source, sprite, -diagonal / 2, -diagonal / 2, entity.size.x, entity.size.y);
        // reset the canvas
        context.restore();
    };
    // TODO: VIEW SCALE
    // OPTIMISATION: save the flip canvas of the entity to reuse later
    Entity2DDrawHelper.flipImage = function (context, entity, source, sprite, isTranslateObject) {
        if (isTranslateObject === void 0) { isTranslateObject = true; }
        var scaleH = entity.horizontalFlip ? -1 : 1; // Set horizontal scale to -1 if flip horizontal
        var scaleV = entity.verticalFlip ? -1 : 1; // Set verical scale to -1 if flip vertical
        var posX = entity.horizontalFlip ? entity.size.x * -1 : 0; // Set x position to -100% if flip horizontal
        var posY = entity.verticalFlip ? entity.size.y * -1 : 0; // Set y position to -100% if flip vertical
        context.save(); // Save the current state
        if (isTranslateObject) {
            context.translate(entity.position.x, entity.position.y);
        }
        context.scale(scaleH, scaleV); // Set scale to flip the image
        draw_helper_1.DrawHelper.drawFromSpriteAndScale(context, source, sprite, posX, posY, entity.size.x, entity.size.y);
        context.restore(); // Restore the last saved state
    };
    // TODO: VIEW SCALE
    // TODO: not perfect rotation => position of the object is not correct at the end !
    // OPTIMISATION: save the flip canvas of the entity to reuse later
    Entity2DDrawHelper.flipAndRotateImage = function (context, entity, source, sprite) {
        var tempCanvasFlip = canvas_factory_1.CanvasFactory.createCanvas(entity.size.x, entity.size.y);
        var tempContextFlip = tempCanvasFlip.getContext('2d');
        if (tempContextFlip) {
            Entity2DDrawHelper.flipImage(tempContextFlip, entity, source, sprite, false);
        }
        var diagonal = Math.sqrt(Math.pow(entity.size.x, 2) + Math.pow(entity.size.y, 2));
        var tempCanvasRotate = canvas_factory_1.CanvasFactory.createCanvas(diagonal, diagonal);
        var tempContextRotate = tempCanvasRotate.getContext('2d');
        if (tempContextRotate) {
            // Convert degrees to radian
            var rad = entity.rotation !== undefined ? entity.rotation * Math.PI / 180 : 0;
            // Rotate the canvas around the origin
            tempContextRotate.translate(diagonal / 2, diagonal / 2);
            tempContextRotate.rotate(rad);
            var x = -entity.size.x / 2;
            var y = -entity.size.y / 2;
            canvas_draw_helper_1.Canvas2DDrawHelper.drawFromCanvas(tempContextRotate, tempCanvasFlip, x, y);
            var x1 = entity.position.x;
            var y1 = entity.position.y;
            canvas_draw_helper_1.Canvas2DDrawHelper.drawFromCanvas(context, tempCanvasRotate, x1, y1);
        }
    };
    Entity2DDrawHelper.drawWithResourceIdFinder = function (entityToDraw, displayReferences, resourceIdFinder) {
        var resourceId = resourceIdFinder(entityToDraw);
        var source = displayReferences.resourceStore.getResource(resourceId);
        if (source) {
            draw_helper_1.DrawHelper.drawFromSpriteAndView(displayReferences.context, displayReferences.view, entityToDraw, source);
        }
    };
    return Entity2DDrawHelper;
}());
exports.Entity2DDrawHelper = Entity2DDrawHelper;
//# sourceMappingURL=../../../src/src/renderer/draw/entity-2d-draw-helper.js.map