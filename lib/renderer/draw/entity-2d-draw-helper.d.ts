import { Entity2DData } from '../commons/entity/entity.types';
import { RectangleData } from '../commons/shape/shape.types';
import { View } from '../commons/view/view.types';
import { DisplayReference } from './draw-helper';
export declare class Entity2DDrawHelper {
    static drawFromEntity2D(displayReferences: DisplayReference, resourceId: string, entities: Entity2DData[] | Entity2DData): Entity2DDrawHelper;
    static drawFromEntity2DMix(displayReferences: DisplayReference, resourceIdFinder: (entity2DData: Entity2DData) => string, entities: Entity2DData[] | Entity2DData): Entity2DDrawHelper;
    static drawEntity2D(context: CanvasRenderingContext2D, view: View, entity: Entity2DData, source: HTMLCanvasElement, sprite: RectangleData): void;
    static isInsideView(entity: RectangleData, view: RectangleData): boolean;
    static rotateImage(context: CanvasRenderingContext2D, entity: Entity2DData, source: HTMLCanvasElement, sprite: RectangleData): void;
    static flipImage(context: CanvasRenderingContext2D, entity: Entity2DData, source: HTMLCanvasElement, sprite: RectangleData, isTranslateObject?: boolean): void;
    static flipAndRotateImage(context: CanvasRenderingContext2D, entity: Entity2DData, source: HTMLCanvasElement, sprite: RectangleData): void;
    private static drawWithResourceIdFinder;
}
