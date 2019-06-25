import { Vector2DData } from './vector-2d.types';
export declare class Vector2DHandler {
    static sAngle(v1: Vector2DData, v2: Vector2DData): number;
    static sClone(v: Vector2DData): {
        x: number;
        y: number;
    };
    static sFromAngleDegree(angleInDegree: number): Vector2DData;
    static sReverse(v: Vector2DData): Vector2DData;
    static sRotate(v: Vector2DData, angle: number, center?: {
        x: number;
        y: number;
    }): Vector2DData;
    static sRotate90(v: Vector2DData, clockwise?: boolean): Vector2DData;
    static sDot(v1: Vector2DData, v2: Vector2DData): number;
    static sNormalize(v: Vector2DData): Vector2DData;
    static sLength(v: Vector2DData): number;
    static sDistance(p1: Vector2DData, p2: Vector2DData): number;
    static sAdd(v1: Vector2DData, v2: Vector2DData): Vector2DData;
    static sSubstract(v1: Vector2DData, v2: Vector2DData): Vector2DData;
    static sMultiply(v1: Vector2DData, scalar: number): Vector2DData;
    static sEquals(v1: Vector2DData, v2: Vector2DData): boolean;
}
