import { TilesPicture } from '../tiles/tiles-picture';
export declare class TilesPictureDrawHelper {
    static drawFromTilePicture(context: CanvasRenderingContext2D, tilePicture: TilesPicture, tileNumber: number, coordx: number, coordy: number): TilesPictureDrawHelper;
    static drawFromTilePictureAndScale(context: CanvasRenderingContext2D, tilePicture: TilesPicture, tileNumber: number, coordx: number, coordy: number, widthTarget: number, heightTarget: number): TilesPictureDrawHelper;
    static drawFromTilePictureAndScalePercent(context: CanvasRenderingContext2D, tilePicture: TilesPicture, tileNumber: number, coordx: number, coordy: number, percentTarget: number): TilesPictureDrawHelper;
}
