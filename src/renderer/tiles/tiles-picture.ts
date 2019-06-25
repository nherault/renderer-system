import { ShapeFactory } from '../commons/shape/shape-factory';
import { RectangleData } from '../commons/shape/shape.types';
import { TileDirection } from './tiles.types';

export class TilesPicture {

    public source: HTMLCanvasElement;
    public width: number;
    public height: number;

    private sprites: RectangleData[];
    private nbTiles: number;
    private tileDirection: TileDirection;

    //////////////////////////////////
    // TilesPicture
    // @source: source of the tile.
    // @nbTiles: number of tiles.
    // @tileDirection: direction of the tile.
    // @width: width of each sprite in the tile.
    // @height: height of each sprite in the tile.
    //////////////////////////////////
    constructor(
        source: HTMLCanvasElement, nbTiles: number, tileDirection: TileDirection, width: number, height: number) {
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
    public getSprite(index: number): RectangleData | undefined {
        return index < this.sprites.length ? this.sprites[Math.floor(index)] : undefined;
    }

    //////////////////////////////////
    // Get the number of sprite in the picture.
    //////////////////////////////////
    public getNbSprite(): number {
        return this.sprites.length;
    }

    //////////////////////////////////
    // Get the picture.
    // @image: image of the tile.
    //////////////////////////////////
    private initSprites(): TilesPicture {

        let i: number = this.nbTiles;
        if (this.tileDirection === TileDirection.LINE) {
            const nbPicturePerLine = Math.floor(this.source.width / this.width);
            while (i--) {
                const y = Math.floor(i / nbPicturePerLine);
                const x = (i + 1) - y * nbPicturePerLine - 1;

                this.sprites[i] = ShapeFactory.createRectangle(
                    x * this.width, y * this.height, this.width, this.height);
            }
        } else if (this.tileDirection === TileDirection.COLUMN) {
            const nbPicturePerColumn = Math.floor(this.source.height / this.height);
            while (i--) {
                const x = Math.floor(i / nbPicturePerColumn);
                const y = (i + 1) - x * nbPicturePerColumn - 1;

                this.sprites[i] = ShapeFactory.createRectangle(
                    x * this.width, y * this.height, this.width, this.height);
            }
        }

        return this;
    }
}
