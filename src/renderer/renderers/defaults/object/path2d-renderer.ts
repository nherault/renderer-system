import { degToRad } from '../../../../utils/utils';
import { Vector2DData } from '../../../commons/vector-2d/vector-2d.types';
import { ObjectRenderParameters } from '../../../render-system.types';
import { computePositionWithVelocity, computeStrokeFill } from '../../../utils';
import { Forms2D, Path2DRendererData, PATH_DATA } from '../../renderer-data.types';

export function renderPath2DOptions({context, path2D, offsetPosition, scale, closePath, strokeFillOptions}:
    {
        context: CanvasRenderingContext2D, path2D: Forms2D[], offsetPosition: Vector2DData,
        scale: Vector2DData, closePath?: boolean, strokeFillOptions: {stroke?: boolean, fill?: boolean},
    }): void {

    const [x, y] = [offsetPosition.x, offsetPosition.y];
    const [scaleX, scaleY] = [scale.x, scale.y];

    context.beginPath();
    context.moveTo(x, y);
    path2D.forEach((currPath: Forms2D) => {
        if (currPath.type === PATH_DATA.LINE_TO) {
            context.lineTo(x + currPath.to.x * scaleX, y + currPath.to.y * scaleY);
        } else if (currPath.type === PATH_DATA.ARC) {
            const radius = currPath.radius * (scaleX + scaleY) / 2;
            context.arc(x, y, radius, degToRad(currPath.startAngle), degToRad(currPath.endAngle));
        } else if (currPath.type === PATH_DATA.ARC_TO) {
            const [fromX, fromY] = [currPath.from.x * scaleX, currPath.from.y * scaleY];
            const [toX, toY] = [currPath.to.x * scaleX, currPath.to.y * scaleY];
            const radius = currPath.radius * (scaleX + scaleY) / 2;
            context.arcTo(x + fromX, y + fromY, x + toX, x + toY, radius);
        } else if (currPath.type === PATH_DATA.RECTANGLE) {
            const [positionX, positionY] = [currPath.position.x * scaleX, currPath.position.y * scaleY];
            const [sizeX, sizeY] = [currPath.size.x * scaleX, currPath.size.y * scaleY];
            context.rect(x + positionX, y + positionY, x + positionX + sizeX, y + positionY + sizeY);
        } else if (currPath.type === PATH_DATA.BEZIER_CURVE_TO) {
            const [cp1X, cp1Y] = [currPath.cp1.x * scaleX, currPath.cp1.y * scaleY];
            const [cp2X, cp2Y] = [currPath.cp2.x * scaleX, currPath.cp2.y * scaleY];
            const [endX, endY] = [currPath.end.x * scaleX, currPath.end.y * scaleY];
            context.bezierCurveTo(x + cp1X, y + cp1Y, x + cp2X, y + cp2Y, x + endX, y + endY);
        } else if (currPath.type === PATH_DATA.QUADRIC_CURVE_TO) {
            const [cpX, cpY] = [currPath.cp.x * scaleX, currPath.cp.y * scaleY];
            const [endX, endY] = [currPath.end.x * scaleX, currPath.end.y * scaleY];
            context.quadraticCurveTo(x + cpX, y + cpY, x + endX, y + endY);
        } else if (currPath.type === PATH_DATA.MOVE_TO) {
            const [toX, toY] = [currPath.to.x * scaleX, currPath.to.y * scaleY];
            context.moveTo(x + toX, y + toY);
        }
    });
    if (closePath) {
        context.closePath();
    }
    computeStrokeFill(strokeFillOptions, () => context.stroke(), () => context.fill());
}

export interface Path2DRendererParameters extends ObjectRenderParameters {
    currentRenderer: Path2DRendererData;
}

export function renderPath2D({context, currentObject, currentRenderer, elapseTime}: Path2DRendererParameters): void {

    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    const [x, y] = [position.x, position.y];
    const {width, height} = calculatePath2DContainerSize(currentRenderer.path);
    const [scaleX, scaleY] = [currentObject.size.x / width, currentObject.size.y / height];

    renderPath2DOptions({
        closePath: currentRenderer.closePath,
        context, offsetPosition: {x, y}, path2D: currentRenderer.path,
        scale: {x: scaleX, y: scaleY}, strokeFillOptions: currentRenderer});
}

export const calculatePath2DContainerSize = (path: Forms2D[]): {width: number, height: number} => {
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    path.forEach((currPath) => {
        if (currPath.type === PATH_DATA.LINE_TO) {
            minX = Math.min(minX, currPath.to.x);
            minY = Math.min(minY, currPath.to.y);
            maxX = Math.max(maxX, currPath.to.x);
            maxY = Math.max(maxY, currPath.to.y);
        } else if (currPath.type === PATH_DATA.ARC) {
            minX = Math.min(minX, currPath.position.x - currPath.radius);
            minY = Math.min(minY, currPath.position.y - currPath.radius);
            maxX = Math.max(maxX, currPath.position.x + currPath.radius);
            maxY = Math.max(maxY, currPath.position.y + currPath.radius);
        } else if (currPath.type === PATH_DATA.ARC_TO) {
            minX = Math.min(minX, currPath.from.x - currPath.radius);
            minY = Math.min(minY, currPath.from.y - currPath.radius);
            maxX = Math.max(maxX, currPath.from.x + currPath.radius);
            maxY = Math.max(maxY, currPath.from.y + currPath.radius);

            minX = Math.min(minX, currPath.to.x - currPath.radius);
            minY = Math.min(minY, currPath.to.y - currPath.radius);
            maxX = Math.max(maxX, currPath.to.x + currPath.radius);
            maxY = Math.max(maxY, currPath.to.y + currPath.radius);
        } else if (currPath.type === PATH_DATA.RECTANGLE) {
            minX = Math.min(minX, currPath.position.x);
            minY = Math.min(minY, currPath.position.y);
            maxX = Math.max(maxX, currPath.position.x + currPath.size.x);
            maxY = Math.max(maxY, currPath.position.y + currPath.size.y);

        } else if (currPath.type === PATH_DATA.BEZIER_CURVE_TO) {
            minX = Math.min(minX, currPath.cp1.x);
            minY = Math.min(minY, currPath.cp1.y);
            maxX = Math.max(maxX, currPath.cp1.x);
            maxY = Math.max(maxY, currPath.cp1.y);

            minX = Math.min(minX, currPath.cp2.x);
            minY = Math.min(minY, currPath.cp2.y);
            maxX = Math.max(maxX, currPath.cp2.x);
            maxY = Math.max(maxY, currPath.cp2.y);

            minX = Math.min(minX, currPath.end.x);
            minY = Math.min(minY, currPath.end.y);
            maxX = Math.max(maxX, currPath.end.x);
            maxY = Math.max(maxY, currPath.end.y);

        } else if (currPath.type === PATH_DATA.QUADRIC_CURVE_TO) {

            minX = Math.min(minX, currPath.cp.x);
            minY = Math.min(minY, currPath.cp.y);
            maxX = Math.max(maxX, currPath.cp.x);
            maxY = Math.max(maxY, currPath.cp.y);

            minX = Math.min(minX, currPath.end.x);
            minY = Math.min(minY, currPath.end.y);
            maxX = Math.max(maxX, currPath.end.x);
            maxY = Math.max(maxY, currPath.end.y);
        } else if (currPath.type === PATH_DATA.MOVE_TO) {
            minX = Math.min(minX, currPath.to.x);
            minY = Math.min(minY, currPath.to.y);
            maxX = Math.max(maxX, currPath.to.x);
            maxY = Math.max(maxY, currPath.to.y);
        }
    });

    return {width: maxX - minX, height: maxY - minY};
};
