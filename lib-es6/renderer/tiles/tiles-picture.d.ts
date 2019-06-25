import { RectangleData } from '../commons/shape/shape.types';
import { TileDirection } from './tiles.types';
export declare class TilesPicture {
    source: HTMLCanvasElement;
    width: number;
    height: number;
    private sprites;
    private nbTiles;
    private tileDirection;
    constructor(source: HTMLCanvasElement, nbTiles: number, tileDirection: TileDirection, width: number, height: number);
    getSprite(index: number): RectangleData | undefined;
    getNbSprite(): number;
    private initSprites;
}
