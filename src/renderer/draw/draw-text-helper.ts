import {Vector2DData} from '../commons/vector-2d/vector-2d.types';

class DrawTextHelper {

    //////////////////////////////////////
    // Draw a text.
    // @text: text to display
    // @coordinate: coordinate of the text
    // @layer: the layer to display the text
    // @style: style of the text
    // @options: options of the text
    //////////////////////////////////////
    public static drawText(
        text: string, coordinate: Vector2DData, canvasContext: CanvasRenderingContext2D,
        style?: string, options?: any, lineHeight?: any): DrawTextHelper {

        // Init text style.
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                (canvasContext as any)[key] = options[key];
            }
        }

        const currLineHeight = lineHeight ? lineHeight : 15;
        const lineWithoutBreak: string[] = text.split('\n');
        for (let n: number = 0; n < lineWithoutBreak.length; n++) {
            DrawTextHelper.displayText(
              lineWithoutBreak[n], {x: coordinate.x, y: coordinate.y + n * currLineHeight}, canvasContext, style);
        }

        return this;
    }

    //////////////////////////////////////
    // Draw a wrap text.
    // @text: text to display
    // @coordinate: coordinate of the text
    // @maxWidth: max with of each line
    // @lineHeight: height between each line
    // @layer: the layer to display the text
    // @style: style of the text
    // @options: options of the text
    //////////////////////////////////////
    public static drawWrapText(
        text: string, coordinate: Vector2DData, maxWidth: number, lineHeight: number,
        canvasContext: CanvasRenderingContext2D, style?: string, options?: any): DrawTextHelper {

        // Init text style.
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                (canvasContext as any)[key] = options[key];
            }
        }

        // Display the text.
        const words: string[] = text.split(' ');
        let line: string = '';

        for (const value of words) {
            const testLine: string = line + value + ' ';
            const lineBreak: number = testLine.search('\n');

            if (lineBreak >= 0) {
                const testLineBreak: string = testLine.substr(0, lineBreak);

                DrawTextHelper.displayText(testLineBreak, coordinate, canvasContext, style);
                line = testLine.substr(lineBreak + 1, testLine.length);
                coordinate.y += lineHeight;
            } else {
                const metrics: TextMetrics = canvasContext.measureText(testLine);
                if (metrics.width > maxWidth) {
                    DrawTextHelper.displayText(line, coordinate, canvasContext, style);
                    line = value + ' ';
                    coordinate.y += lineHeight;
                } else {
                    line = testLine;
                }
            }
        }

        DrawTextHelper.displayText(line, coordinate, canvasContext, style);
        return this;
    }

    //////////////////////////////////////
    // Display the text.
    // @text: text to display
    // @coordinate: coordinate of the text
    // @layer: the layer to display the text
    // @style: style of the text
    //////////////////////////////////////
    public static displayText(
        text: string, coordinate: Vector2DData,
        canvasContext: CanvasRenderingContext2D, style?: string): DrawTextHelper {
        if (style === TEXT_STYLE_STROKE) {
            canvasContext.strokeText(text, coordinate.x, coordinate.y);
        } else if (!style || style === TEXT_STYLE_FILL) {
            canvasContext.fillText(text, coordinate.x, coordinate.y);
        }
        return this;
    }
}

const TEXT_STYLE_FILL = 'fill';
const TEXT_STYLE_STROKE = 'stroke';

export {DrawTextHelper, TEXT_STYLE_FILL, TEXT_STYLE_STROKE};
