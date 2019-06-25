import { Vector2DData } from '../vector-2d/vector-2d.types';
import { RectangleData } from '../shape/shape.types';
import { ShapeFactory } from '../shape/shape-factory';
import { ViewData } from './view.types';

export class ViewHandler {
    public static calculateViewCoordinate(entity: Vector2DData, view: RectangleData): Vector2DData {
        const x = entity.x - view.position.x;
        const y = entity.y - view.position.y;
        return { x, y };
    }

    public static isInViewData(view: ViewData, entity: { position: Vector2DData, size: Vector2DData}) {
        return view.position.x * view.scale < entity.position.x * view.scale + entity.size.x * view.scale &&
            view.position.x * view.scale + view.size.x > entity.position.x * view.scale &&
            view.position.y * view.scale < entity.position.y * view.scale + entity.size.y * view.scale &&
            view.position.y * view.scale + view.size.y > entity.position.y * view.scale;
    }

    public static isInView(view: RectangleData, rectangle: RectangleData): boolean {
        // Move the coordinate to display depends of the view.
        const { x, y } = ViewHandler.calculateViewCoordinate(rectangle.position, view);

        // Check if part of it is inside the view
        return !(x > view.size.x || y > view.size.y || x + rectangle.size.x < 0 || y + rectangle.size.y < 0);
    }

    public static calculateRectangleInsideView(view: RectangleData, rectangle: RectangleData)
        : { coord: Vector2DData, rect: RectangleData } | undefined {

        // Move the coordinate to display depends of the view.
        const { x, y } = ViewHandler.calculateViewCoordinate(rectangle.position, view);

        // Check if part of it is inside the view
        if (x > view.size.x || y > view.size.y || x + rectangle.size.x < 0 || y + rectangle.size.y < 0) {
            return undefined;
        }

        // Calculate the coordinate inside the view
        const coordXInView = Math.floor(Math.max(x, view.position.x));
        const coordYInView = Math.floor(Math.max(y, view.position.y));

        const resultClipping = ShapeFactory.createRectangle(0, 0, rectangle.size.x, rectangle.size.y);

        // Calculate the clipping
        if (rectangle.position.x < view.position.x) {
            resultClipping.position.x = view.position.x - rectangle.position.x;
            resultClipping.size.x -= resultClipping.position.x;
        }

        if (rectangle.position.y < view.position.y) {
            resultClipping.position.y = view.position.y - rectangle.position.y;
            resultClipping.size.y -= resultClipping.position.y;
        }

        if (coordXInView + resultClipping.size.x > view.size.x) {
            resultClipping.size.x = view.size.x - coordXInView;
        }

        if (coordYInView + resultClipping.size.y > view.size.y) {
            resultClipping.size.y = view.size.y - coordYInView;
        }

        return { coord: { x: coordXInView, y: coordYInView }, rect: resultClipping };
    }

    public static intersect(a: RectangleData, b: RectangleData): RectangleData | undefined {

        const x = Math.max(a.position.x, b.position.x);
        const num1 = Math.min(a.position.x + a.size.x, b.position.x + b.size.x);
        const y = Math.max(a.position.y, b.position.y);
        const num2 = Math.min(a.position.y + a.size.x, b.position.y + b.size.y);
        return num1 >= x && num2 >= y
            ? {
                position: { x, y },
                size: {
                    x: num1 - x,
                    y: num2 - y,
                },
            }
            : undefined;
    }
}
