import {Vector2DData} from './vector-2d.types';

export class Vector2DHandler {

  public static sAngle(v1: Vector2DData, v2: Vector2DData) {
    return Math.acos(Vector2DHandler.sDot(
      Vector2DHandler.sNormalize(Vector2DHandler.sClone(v1)),
      Vector2DHandler.sNormalize(Vector2DHandler.sClone(v2))));
  }

  public static sClone(v: Vector2DData) {
    return {x: v.x, y: v.y};
  }

  public static sFromAngleDegree(angleInDegree: number): Vector2DData {
    return {x: Math.sin(angleInDegree * Math.PI / 180), y: Math.cos(angleInDegree * Math.PI / 180)};
  }

  public static sReverse(v: Vector2DData): Vector2DData {
    v.x = -v.x;
    v.y = -v.y;
    return v;
  }

  public static sRotate(v: Vector2DData, angle: number, center = {x: 0, y: 0}): Vector2DData {
    const x1 = v.x - center.x;
    const y1 = v.y - center.y;

    const x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
    const y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);

    v.x = x2 + center.x;
    v.y = y2 + center.y;
    return v;
  }

  public static sRotate90(v: Vector2DData, clockwise = true): Vector2DData {
    if (clockwise) {
      v.x = v.y;
      v.y = -v.x;
    } else {
      v.x = -v.y;
      v.y = v.x;
    }
    return v;
  }

  public static sDot(v1: Vector2DData, v2: Vector2DData): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static sNormalize(v: Vector2DData): Vector2DData {
    const length = Vector2DHandler.sLength(v);
    if (length !== 0) {
      v.x = v.x / length;
      v.y = v.y / length;
    } else {
      v.x = 0;
      v.y = 0;
    }
    return v;
  }

  public static sLength(v: Vector2DData): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  public static sDistance(p1: Vector2DData, p2: Vector2DData): number {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
  }

  public static sAdd(v1: Vector2DData, v2: Vector2DData): Vector2DData {
    v1.x = v1.x + v2.x;
    v1.y = v1.y + v2.y;
    return v1;
  }

  public static sSubstract(v1: Vector2DData, v2: Vector2DData): Vector2DData {
    v1.x = v1.x - v2.x;
    v1.y = v1.y - v2.y;
    return v1;
  }

  public static sMultiply(v1: Vector2DData, scalar: number): Vector2DData {
    v1.x = v1.x * scalar;
    v1.y = v1.y * scalar;
    return v1;
  }

  public static sEquals(v1: Vector2DData, v2: Vector2DData): boolean {
    return v1.x === v2.x && v1.y === v2.y;
  }
}
