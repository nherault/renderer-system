import { computeOrDefault, getOrDefault } from '../../../../utils/utils';
import { Vector2DData } from '../../../commons/vector-2d/vector-2d.types';
import { ObjectRenderParameters } from '../../../render-system.types';
import { computePositionWithAnchor, computePositionWithOffset, computePositionWithVelocity, computeStrokeFill, targetRetriever } from '../../../utils';
import { TextRendererData } from '../../renderer-data.types';

export interface TextRendererParameters extends ObjectRenderParameters {
    currentRenderer: TextRendererData;
}

// TODO: anchor not working !!
export function renderText({context, currentObject, currentRenderer, view, elapseTime}: TextRendererParameters): void {

    if (currentRenderer.text !== undefined) {
        const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
        const newPositionWithAnchor = computeOrDefault(
            currentRenderer.anchor,
            (anchor) => computePositionWithAnchor((target) => targetRetriever({ target, currentObject, view }), anchor),
            position);
        const newPositionWithOffset = computePositionWithOffset(
            newPositionWithAnchor,
            getOrDefault(currentRenderer.offsetPosition, {x: 0, y: 0}));

        if (currentObject.size && currentObject.size.x !== undefined) {
            if (currentRenderer.autoScale) {
                renderSizeText(context, currentRenderer, newPositionWithOffset, currentObject.size);
            } else {
                renderSizeLineBreakText(context, currentRenderer, newPositionWithOffset, currentObject.size);
            }
        } else {
            drawText(context, currentRenderer, newPositionWithOffset);
        }
    }
}

/*
export function renderText({context, currentObject, currentRenderer, view, elapseTime}: TextRendererParameters): void {

    const position = computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
    const newPositionWithAnchor = computeOrDefault((<any>currentRenderer).anchor, position,
        () => computePositionWithAnchor((target) => targetRetriever(target, currentObject, view), (<any>currentRenderer).anchor));
    const newPositionWithOffset =
        computePositionWithOffset(newPositionWithAnchor, getOrDefault(currentRenderer.offsetPosition, {x: 0, y: 0}));

    computeStrokeFill(currentRenderer,
        () => context.strokeText(currentRenderer.text, newPositionWithOffset.x, newPositionWithOffset.y),
        () => context.fillText(currentRenderer.text, newPositionWithOffset.x, newPositionWithOffset.y)
    );
}
*/

function renderSizeText(
    context: CanvasRenderingContext2D, currentRenderer: TextRendererData,
    position: Vector2DData, size: Vector2DData, lineHeight?: number) {

    const currLineHeight: number = getOrDefault(lineHeight, getLineHeight(context) * 1.2);
    const lines = currentRenderer.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        computeStrokeFill(currentRenderer,
            () => context.strokeText(line, position.x, position.y + currLineHeight * i, size.x),
            () => context.fillText(line, position.x, position.y + currLineHeight * i, size.x),
        );
    }
}

function getLineHeight(ctx: CanvasRenderingContext2D): number {
    return ctx.measureText('M').width;
}

function renderSizeLineBreakText(
    context: CanvasRenderingContext2D, currentRenderer: TextRendererData,
    position: Vector2DData, size: Vector2DData) {

    const textMetrics: TextMetrics = context.measureText(currentRenderer.text);

    if (textMetrics.width > size.x) {
        const maxCharacterByLine = Math.floor(currentRenderer.text.length / (textMetrics.width / size.x));
        drawText(context, currentRenderer, position, maxCharacterByLine);
    } else {
        drawText(context, currentRenderer, position);
    }
}

function drawText(
    context: CanvasRenderingContext2D, currentRenderer: TextRendererData,
    position: Vector2DData, maxCharacterByLine?: number, lineHeight?: number) {

    const lines = currentRenderer.text.split('\n');
    const currLineHeight: number = getOrDefault(lineHeight, getLineHeight(context) * 1.2);
    let lineCount = 0;
    for (let line of lines) {
        if (maxCharacterByLine !== undefined) {
            const words = line.split(' ');
            line = words[0] + ' ';
            for (let j = 1; j < words.length; j++) {
                if (line.length + words[j].length > maxCharacterByLine) {
                    computeStrokeFill(currentRenderer,
                        () => context.strokeText(line, position.x, position.y + currLineHeight * lineCount),
                        () => context.fillText(line, position.x, position.y + currLineHeight * lineCount),
                    );
                    lineCount++;
                    line = '';
                }
                line += words[j] + ' ';
            }
        }
        computeStrokeFill(currentRenderer,
            () => context.strokeText(line, position.x, position.y + currLineHeight * lineCount),
            () => context.fillText(line, position.x, position.y + currLineHeight * lineCount),
        );
        lineCount++;
    }
}
