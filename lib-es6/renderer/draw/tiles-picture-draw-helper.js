import { DrawHelper } from './draw-helper';
var TilesPictureDrawHelper = /** @class */ (function () {
    function TilesPictureDrawHelper() {
    }
    TilesPictureDrawHelper.drawFromTilePicture = function (context, tilePicture, tileNumber, coordx, coordy) {
        var sprite = tilePicture.getSprite(tileNumber);
        if (sprite) {
            DrawHelper.drawFromSprite(context, tilePicture.source, sprite, coordx, coordy);
        }
        return this;
    };
    TilesPictureDrawHelper.drawFromTilePictureAndScale = function (context, tilePicture, tileNumber, coordx, coordy, widthTarget, heightTarget) {
        var sprite = tilePicture.getSprite(tileNumber);
        if (sprite) {
            DrawHelper.drawFromSpriteAndScale(context, tilePicture.source, sprite, coordx, coordy, widthTarget, heightTarget);
        }
        return this;
    };
    TilesPictureDrawHelper.drawFromTilePictureAndScalePercent = function (context, tilePicture, tileNumber, coordx, coordy, percentTarget) {
        var sprite = tilePicture.getSprite(tileNumber);
        if (sprite) {
            DrawHelper.drawFromSpriteAndScalePercent(context, tilePicture.source, sprite, coordx, coordy, percentTarget);
        }
        return this;
    };
    return TilesPictureDrawHelper;
}());
export { TilesPictureDrawHelper };
//# sourceMappingURL=../../../src/src/renderer/draw/tiles-picture-draw-helper.js.map