"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_factory_1 = require("../commons/shape/shape-factory");
var tiles_types_1 = require("./tiles.types");
var TilesPicture = /** @class */ (function () {
    //////////////////////////////////
    // TilesPicture
    // @source: source of the tile.
    // @nbTiles: number of tiles.
    // @tileDirection: direction of the tile.
    // @width: width of each sprite in the tile.
    // @height: height of each sprite in the tile.
    //////////////////////////////////
    function TilesPicture(source, nbTiles, tileDirection, width, height) {
        this.source = source;
        this.nbTiles = nbTiles;
        this.tileDirection = tileDirection;
        this.width = width;
        this.height = height;
        this.sprites = new Array(this.nbTiles);
        // Init the sprites.
        this.initSprites();
    }
    //////////////////////////////////
    // Get the picture.
    // @index: index of the sprite in the tile.
    //////////////////////////////////
    TilesPicture.prototype.getSprite = function (index) {
        return index < this.sprites.length ? this.sprites[Math.floor(index)] : undefined;
    };
    //////////////////////////////////
    // Get the number of sprite in the picture.
    //////////////////////////////////
    TilesPicture.prototype.getNbSprite = function () {
        return this.sprites.length;
    };
    //////////////////////////////////
    // Get the picture.
    // @image: image of the tile.
    //////////////////////////////////
    TilesPicture.prototype.initSprites = function () {
        var i = this.nbTiles;
        if (this.tileDirection === tiles_types_1.TileDirection.LINE) {
            var nbPicturePerLine = Math.floor(this.source.width / this.width);
            while (i--) {
                var y = Math.floor(i / nbPicturePerLine);
                var x = (i + 1) - y * nbPicturePerLine - 1;
                this.sprites[i] = shape_factory_1.ShapeFactory.createRectangle(x * this.width, y * this.height, this.width, this.height);
            }
        }
        else if (this.tileDirection === tiles_types_1.TileDirection.COLUMN) {
            var nbPicturePerColumn = Math.floor(this.source.height / this.height);
            while (i--) {
                var x = Math.floor(i / nbPicturePerColumn);
                var y = (i + 1) - x * nbPicturePerColumn - 1;
                this.sprites[i] = shape_factory_1.ShapeFactory.createRectangle(x * this.width, y * this.height, this.width, this.height);
            }
        }
        return this;
    };
    return TilesPicture;
}());
exports.TilesPicture = TilesPicture;
//# sourceMappingURL=../../../src/src/renderer/tiles/tiles-picture.js.map