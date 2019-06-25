import { CircleData, RectangleData } from '../commons/shape/shape.types';
import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { View } from '../commons/view/view.types';
export interface DisplayReference {
    context: CanvasRenderingContext2D;
    view: View;
    resourceStore: ResourceStore;
}
export interface ResourceStore {
    getResource: (id: string) => HTMLCanvasElement | any;
}
export declare class DrawHelper {
    static clearView(context: CanvasRenderingContext2D, view: RectangleData): DrawHelper;
    static clearDisplay(displayReferences: DisplayReference): DrawHelper;
    static drawFromSpriteAndView(context: CanvasRenderingContext2D, view: View, entity: RectangleData, source: HTMLCanvasElement, sprite?: RectangleData): void;
    static drawFromSprite(context: CanvasRenderingContext2D, source: HTMLCanvasElement, sprite: RectangleData, coordx: number, coordy: number): DrawHelper;
    static drawFromSpriteAndScale(context: CanvasRenderingContext2D, source: HTMLCanvasElement, sprite: RectangleData, coordx: number, coordy: number, widthTarget: number, heightTarget: number): DrawHelper;
    static drawFromSpriteAndScalePercent(context: CanvasRenderingContext2D, source: HTMLCanvasElement, sprite: RectangleData, coordx: number, coordy: number, percentTarget: number): DrawHelper;
    static translateIntoView(view: RectangleData, source: HTMLCanvasElement, coordx: number, coordy: number): {
        x: number;
        y: number;
    };
    static translateIntoViewX(view: RectangleData, source: HTMLCanvasElement, coordx: number, coordy: number): {
        x: number;
        y: number;
    };
    static translateIntoViewY(view: RectangleData, source: HTMLCanvasElement, coordx: number, coordy: number): {
        x: number;
        y: number;
    };
    static drawFromCanvasRepeatX(context: CanvasRenderingContext2D, view: RectangleData, source: HTMLCanvasElement, coordx: number, coordy: number, isTranslate?: boolean): DrawHelper;
    static drawFromCanvasRepeatY(context: CanvasRenderingContext2D, view: RectangleData, source: HTMLCanvasElement, coordx: number, coordy: number, isTranslate?: boolean): DrawHelper;
    static drawFromCanvasRepeat(context: CanvasRenderingContext2D, view: RectangleData, source: HTMLCanvasElement, coordx: number, coordy: number): DrawHelper;
    static drawFromResource(displayReferences: DisplayReference, resourceId: string, rectangle: RectangleData): DrawHelper;
    static isInView(view: RectangleData, rectangle: RectangleData): boolean;
    static calculateRectangleInsideView(view: RectangleData, rectangle: RectangleData): {
        coord: Vector2DData;
        rect: RectangleData;
    } | undefined;
    static intersect(a: RectangleData, b: RectangleData): RectangleData | undefined;
    static calculateViewCoordinate(entity: Vector2DData, view: RectangleData): Vector2DData;
    static drawRectangle(context: CanvasRenderingContext2D, rectangleData: RectangleData, options?: {
        strokeStyle?: string;
        isStroke?: boolean;
        fillStyle?: string;
        isFill?: boolean;
    }): void;
    static drawCircle(context: CanvasRenderingContext2D, circleData: CircleData, options?: {
        strokeStyle?: string;
        isStroke?: boolean;
        fillStyle?: string;
        isFill?: boolean;
    }): void;
}
