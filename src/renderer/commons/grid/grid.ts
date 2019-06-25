import { Vector2DData } from '../vector-2d/vector-2d.types';

export class Grid {

    private width: number;
    private height: number;
    private squareSize: number;
    private spriteIndexes: number[][];

    constructor(width: number, height: number, squareSize: number) {
        this.width = width;
        this.height = height;
        this.squareSize = squareSize;

        this.spriteIndexes = new Array(this.width);

        for (let i: number = 0; i < this.width; i++) {
            this.spriteIndexes[i] = new Array(this.height);
        }
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public getSpriteIndexes() {
        return this.spriteIndexes;
    }

    public getSquareSize() {
        return this.squareSize;
    }

    // TODO: return 'any' unstead of 'number'?
    public getGridValue(i: number, j: number): number {
        return this.spriteIndexes[i][j];
    }

    public getGridCoordinate(x: number, y: number): Vector2DData {
        return {x: Math.floor(x / this.squareSize), y: Math.floor(y / this.squareSize)};
    }
}
