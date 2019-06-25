import { CanvasFactory } from '../canvas/canvas-factory';
import { Grid } from '../commons/grid/grid';
import { TilesPicture } from '../tiles/tiles-picture';
import { DrawHelper } from './draw-helper';

export class GridDrawHelper {

  public static createCanvasFromGrid(grid: Grid, tilesPicture: TilesPicture): HTMLCanvasElement {
      const canvas: HTMLCanvasElement = CanvasFactory
      .createCanvas(grid.getWidth() * grid.getSquareSize(), grid.getHeight() * grid.getSquareSize());

      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (context) {
        for (let i: number = 0; i < grid.getWidth(); i++) {
            for (let j: number = 0; j < grid.getHeight(); j++) {
                const sprite = tilesPicture.getSprite(grid.getGridValue(i, j));
                if (sprite) {
                    const entity = {
                        position: {x: i * grid.getSquareSize(), y: j * grid.getSquareSize()},
                        size: {x: grid.getSquareSize(), y: grid.getSquareSize()},
                    };
                    DrawHelper.drawEntity(
                        context,
                        tilesPicture.source,
                        entity,
                        {sprite},
                    );
                }
            }
        }
      }

      return canvas;
  }
}
