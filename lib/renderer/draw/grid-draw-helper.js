"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_factory_1 = require("../canvas/canvas-factory");
var draw_helper_1 = require("./draw-helper");
var GridDrawHelper = /** @class */ (function () {
    function GridDrawHelper() {
    }
    GridDrawHelper.createCanvasFromGrid = function (grid, tilesPicture) {
        var canvas = canvas_factory_1.CanvasFactory
            .createCanvas(grid.getWidth() * grid.getSquareSize(), grid.getHeight() * grid.getSquareSize());
        var context = canvas.getContext('2d');
        if (context) {
            for (var i = 0; i < grid.getWidth(); i++) {
                for (var j = 0; j < grid.getHeight(); j++) {
                    var sprite = tilesPicture.getSprite(grid.getGridValue(i, j));
                    if (sprite) {
                        draw_helper_1.DrawHelper.drawFromSpriteAndScale(context, tilesPicture.source, sprite, i * grid.getSquareSize(), j * grid.getSquareSize(), grid.getSquareSize(), grid.getSquareSize());
                    }
                }
            }
        }
        return canvas;
    };
    return GridDrawHelper;
}());
exports.GridDrawHelper = GridDrawHelper;
//# sourceMappingURL=../../../src/src/renderer/draw/grid-draw-helper.js.map