import { Vector2DData } from '../vector-2d/vector-2d.types';
export declare class Grid {
    private width;
    private height;
    private squareSize;
    private spriteIndexes;
    constructor(width: number, height: number, squareSize: number);
    getWidth(): number;
    getHeight(): number;
    getSpriteIndexes(): number[][];
    getSquareSize(): number;
    getGridValue(i: number, j: number): number;
    getGridCoordinate(x: number, y: number): Vector2DData;
}
