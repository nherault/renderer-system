import { ShapeFactory } from '../commons/shape/shape-factory';
import { RectangleData } from '../commons/shape/shape.types';
import { ViewHandler } from '../commons/view/view-handler';
import { DrawHelper } from './draw-helper';

export class DrawRepeatHelper {

    public static drawFromCanvasRepeatX(
        context: CanvasRenderingContext2D, view: RectangleData, source: HTMLCanvasElement,
        coordx: number, coordy: number, isTranslate: boolean = true): DrawHelper {

        const { x, y } = isTranslate ? DrawRepeatHelper.translateIntoViewX(view, source, coordx, coordy) : { x: coordx, y: coordy };
        if (ViewHandler.isInView(
            view, ShapeFactory.createRectangle(x, y, source.width, source.height))) {
            context.drawImage(source, x, y);

            // Draw before
            let currCoordX = x - source.width;
            while (ViewHandler.isInView(
                view, ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
                context.drawImage(source, currCoordX, y);
                currCoordX -= source.width;
            }

            // Draw after
            currCoordX = x + source.width;
            while (ViewHandler.isInView(
                view,
                ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
                context.drawImage(source, currCoordX, y);
                currCoordX += source.width;
            }
        }
        return this;
    }

    public static drawFromCanvasRepeatY(
        context: CanvasRenderingContext2D, view: RectangleData, source: HTMLCanvasElement,
        coordx: number, coordy: number, isTranslate: boolean = true): DrawHelper {

        const { x, y } = isTranslate ? DrawRepeatHelper.translateIntoViewY(view, source, coordx, coordy) : { x: coordx, y: coordy };
        if (ViewHandler.isInView(
            view, ShapeFactory.createRectangle(x, y, source.width, source.height))) {
            context.drawImage(source, x, y);

            // Draw before
            let currCoordY = y - source.height;
            while (ViewHandler.isInView(
                view,
                ShapeFactory.createRectangle(x, currCoordY, source.width, source.height))) {
                context.drawImage(source, x, currCoordY);
                currCoordY -= source.height;
            }

            // Draw after
            currCoordY = y + source.height;
            while (ViewHandler.isInView(
                view,
                ShapeFactory.createRectangle(x, currCoordY, source.width, source.height))) {
                context.drawImage(source, x, currCoordY);
                currCoordY += source.height;
            }
        }
        return this;
    }

    public static drawFromCanvasRepeat(
        context: CanvasRenderingContext2D, view: RectangleData, source: HTMLCanvasElement,
        coordx: number, coordy: number): DrawHelper {

        const { x, y } = DrawRepeatHelper.translateIntoView(view, source, coordx, coordy);
        context.drawImage(source, x, y);
        DrawRepeatHelper.drawFromCanvasRepeatX(context, view, source, x, y, false);
        DrawRepeatHelper.drawFromCanvasRepeatY(context, view, source, x, y, false);

        // Draw before
        let currCoordX = x - source.width;
        while (ViewHandler.isInView(
            view,
            ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
            context.drawImage(source, currCoordX, y);
            DrawRepeatHelper.drawFromCanvasRepeatY(context, view, source, currCoordX, y);
            currCoordX -= source.width;
        }

        // Draw after
        currCoordX = x + source.width;
        while (ViewHandler.isInView(
            view,
            ShapeFactory.createRectangle(currCoordX, y, source.width, source.height))) {
            context.drawImage(source, currCoordX, y);
            DrawRepeatHelper.drawFromCanvasRepeatY(context, view, source, currCoordX, y);
            currCoordX += source.width;
        }
        return this;
    }

    private static translateIntoView(
        view: RectangleData, source: HTMLCanvasElement,
        coordx: number, coordy: number): { x: number, y: number } {

        let x = coordx;
        let y = coordy;
        if (!ViewHandler.isInView(
            view,
            ShapeFactory.createRectangle(coordx, coordy, source.width, source.height))) {
            if (coordx < view.position.x) {
                x = coordx + Math.round(Math.abs(coordx - view.position.x) / source.width) * source.width;
            } else if (coordx > view.position.x) {
                x = coordx - (Math.round(Math.abs(coordx - (view.position.x + view.size.x)) / source.width) + 1) * source.width;
            }

            if (coordy < view.position.y) {
                y = coordy + Math.round(Math.abs(coordy - view.position.y) / source.height) * source.height;
            } else if (coordy > view.position.y) {
                y = coordy - (Math.round(Math.abs(coordy - (view.position.y + view.size.y)) / source.height) + 1) * source.height;
            }
        }
        return { x, y };
    }

    private static translateIntoViewX(
        view: RectangleData, source: HTMLCanvasElement,
        coordx: number, coordy: number): { x: number, y: number } {

        let x = coordx;
        const y = coordy;
        if (!ViewHandler.isInView(
            view,
            ShapeFactory.createRectangle(coordx, coordy, source.width, source.height))) {
            if (coordx < view.position.x) {
                x = coordx + Math.round(Math.abs(coordx - view.position.x) / source.width) * source.width;
            } else if (coordx > view.position.x) {
                x = coordx - (Math.round(Math.abs(coordx - (view.position.x + view.size.x)) / source.width) + 1) * source.width;
            }
        }
        return { x, y };
    }

    private static translateIntoViewY(
        view: RectangleData, source: HTMLCanvasElement,
        coordx: number, coordy: number): { x: number, y: number } {

        const x = coordx;
        let y = coordy;
        if (!ViewHandler.isInView(
            view,
            ShapeFactory.createRectangle(coordx, coordy, source.width, source.height))) {
            if (coordy < view.position.y) {
                y = coordy + Math.round(Math.abs(coordy - view.position.y) / source.height) * source.height;
            } else if (coordy > view.position.y) {
                y = coordy - (Math.round(Math.abs(coordy - (view.position.y + view.size.y)) / source.height) + 1) * source.height;
            }
        }
        return { x, y };
    }
}
