import { CircleData, RectangleData } from '../commons/shape/shape.types';
import { ViewData } from '../commons/view/view.types';

export class DrawHelper {

    public static clearView(context: CanvasRenderingContext2D, view: RectangleData): DrawHelper {
        context.clearRect(0, 0, view.size.x, view.size.y);
        return this;
    }

    public static drawEntity(
        context: CanvasRenderingContext2D, source: HTMLCanvasElement,
        entity: RectangleData,
        option?: {view?: ViewData, sprite?: RectangleData}): void {
            const view = option && option.view || {
                position: { x: 0, y: 0 },
                scale: 1.0,
            };
            const sprite = option && option.sprite || {
                position: { x: 0, y: 0 },
                size: { x: source.width, y: source.height },
            };
            const sourceX = sprite.position.x;
            const sourceY = sprite.position.y;
            const sourceWidth = sprite.size.x;
            const sourceHeight = sprite.size.y;
            const entityX = (entity.position.x - view.position.x) * view.scale;
            const entityY = (entity.position.y - view.position.y) * view.scale;
            const entityWidth = entity.size.x * view.scale;
            const entityHeight = entity.size.y * view.scale;
            context.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, entityX, entityY, entityWidth, entityHeight);
    }

    public static drawRectangle(
        context: CanvasRenderingContext2D, rectangleData: RectangleData,
        options?: { strokeStyle?: string, isStroke?: boolean, fillStyle?: string, isFill?: boolean }): void {

        // Options
        const strokeStyle = (options && options.strokeStyle) || 'red';
        const isStroke = (options && options.isStroke) || true;
        const fillStyle = (options && options.fillStyle) || 'red';
        const isFill = (options && options.isFill) || false;

        if (isStroke) {
            context.strokeStyle = strokeStyle;
        }
        if (isFill) {
            context.fillStyle = fillStyle;
        }
        context.rect(rectangleData.position.x, rectangleData.position.y, rectangleData.size.x, rectangleData.size.y);
        if (isStroke) {
            context.stroke();
        }
        if (isFill) {
            context.fill();
        }
    }

    public static drawCircle(
        context: CanvasRenderingContext2D, circleData: CircleData,
        options?: { strokeStyle?: string, isStroke?: boolean, fillStyle?: string, isFill?: boolean }): void {

        // Options
        const strokeStyle = (options && options.strokeStyle) || 'red';
        const isStroke = (options && options.isStroke) || true;
        const fillStyle = (options && options.fillStyle) || 'red';
        const isFill = (options && options.isFill) || false;

        if (isStroke) {
            context.strokeStyle = strokeStyle;
        }
        if (isFill) {
            context.fillStyle = fillStyle;
        }
        context.arc(circleData.position.x, circleData.position.y, circleData.radius, 0, 2 * Math.PI, false);
        if (isStroke) {
            context.stroke();
        }
        if (isFill) {
            context.fill();
        }
    }
}
