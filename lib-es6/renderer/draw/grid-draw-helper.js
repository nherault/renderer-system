import { CanvasFactory } from '../canvas/canvas-factory';
import { DrawHelper } from './draw-helper';
var GridDrawHelper = /** @class */ (function () {
    function GridDrawHelper() {
    }
    GridDrawHelper.createCanvasFromGrid = function (grid, tilesPicture) {
        var canvas = CanvasFactory
            .createCanvas(grid.getWidth() * grid.getSquareSize(), grid.getHeight() * grid.getSquareSize());
        var context = canvas.getContext('2d');
        if (context) {
            for (var i = 0; i < grid.getWidth(); i++) {
                for (var j = 0; j < grid.getHeight(); j++) {
                    var sprite = tilesPicture.getSprite(grid.getGridValue(i, j));
                    if (sprite) {
                        DrawHelper.drawFromSpriteAndScale(context, tilesPicture.source, sprite, i * grid.getSquareSize(), j * grid.getSquareSize(), grid.getSquareSize(), grid.getSquareSize());
                    }
                }
            }
        }
        return canvas;
    };
    return GridDrawHelper;
}());
export { GridDrawHelper };
//# sourceMappingURL=../../../src/src/renderer/draw/grid-draw-helper.js.map