"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    function Grid(width, height, squareSize) {
        this.width = width;
        this.height = height;
        this.squareSize = squareSize;
        this.spriteIndexes = new Array(this.width);
        for (var i = 0; i < this.width; i++) {
            this.spriteIndexes[i] = new Array(this.height);
        }
    }
    Grid.prototype.getWidth = function () {
        return this.width;
    };
    Grid.prototype.getHeight = function () {
        return this.height;
    };
    Grid.prototype.getSpriteIndexes = function () {
        return this.spriteIndexes;
    };
    Grid.prototype.getSquareSize = function () {
        return this.squareSize;
    };
    Grid.prototype.getGridValue = function (i, j) {
        return this.spriteIndexes[i][j];
    };
    Grid.prototype.getGridCoordinate = function (x, y) {
        return { x: Math.floor(x / this.squareSize), y: Math.floor(y / this.squareSize) };
    };
    return Grid;
}());
exports.Grid = Grid;
//# sourceMappingURL=../../../../src/src/renderer/commons/grid/grid.js.map