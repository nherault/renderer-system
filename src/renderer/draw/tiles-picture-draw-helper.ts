import { RectangleData } from '../commons/shape/shape.types';
import { TilesPicture } from '../tiles/tiles-picture';
import { DrawHelper } from './draw-helper';

export class TilesPictureDrawHelper {

  public static drawFromTilePicture(
    context: CanvasRenderingContext2D, tilePicture: TilesPicture,
    tileNumber: number, entity: RectangleData): TilesPictureDrawHelper {

    const sprite: RectangleData | undefined = tilePicture.getSprite(tileNumber);
    if (sprite) {
      DrawHelper.drawEntity(context, tilePicture.source, entity, { sprite });
    }
    return this;
  }
}
