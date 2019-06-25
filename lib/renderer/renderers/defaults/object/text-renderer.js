"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../../utils/utils");
var utils_2 = require("../../../utils");
function renderText(_a) {
    var context = _a.context, currentObject = _a.currentObject, currentRenderer = _a.currentRenderer, view = _a.view, elapseTime = _a.elapseTime;
    if (currentRenderer.text !== undefined) {
        var position = utils_2.computePositionWithVelocity(currentObject.position, elapseTime, currentObject.velocity);
        var newPositionWithAnchor = utils_1.computeOrDefault(currentRenderer.anchor, function (anchor) { return utils_2.computePositionWithAnchor(function (target) { return utils_2.targetRetriever({ target: target, currentObject: currentObject, view: view }); }, anchor); }, position);
        var newPositionWithOffset = utils_2.computePositionWithOffset(newPositionWithAnchor, utils_1.getOrDefault(currentRenderer.offsetPosition, { x: 0, y: 0 }));
        if (currentObject.size && currentObject.size.x !== undefined) {
            if (currentRenderer.autoScale) {
                renderSizeText(context, currentRenderer, newPositionWithOffset, currentObject.size);
            }
            else {
                renderSizeLineBreakText(context, currentRenderer, newPositionWithOffset, currentObject.size);
            }
        }
        else {
            drawText(context, currentRenderer, newPositionWithOffset);
        }
    }
}
exports.renderText = renderText;
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
function renderSizeText(context, currentRenderer, position, size, lineHeight) {
    var currLineHeight = utils_1.getOrDefault(lineHeight, getLineHeight(context) * 1.2);
    var lines = currentRenderer.text.split('\n');
    var _loop_1 = function (i) {
        var line = lines[i];
        utils_2.computeStrokeFill(currentRenderer, function () { return context.strokeText(line, position.x, position.y + currLineHeight * i, size.x); }, function () { return context.fillText(line, position.x, position.y + currLineHeight * i, size.x); });
    };
    for (var i = 0; i < lines.length; i++) {
        _loop_1(i);
    }
}
function getLineHeight(ctx) {
    return ctx.measureText('M').width;
}
function renderSizeLineBreakText(context, currentRenderer, position, size) {
    var textMetrics = context.measureText(currentRenderer.text);
    if (textMetrics.width > size.x) {
        var maxCharacterByLine = Math.floor(currentRenderer.text.length / (textMetrics.width / size.x));
        drawText(context, currentRenderer, position, maxCharacterByLine);
    }
    else {
        drawText(context, currentRenderer, position);
    }
}
function drawText(context, currentRenderer, position, maxCharacterByLine, lineHeight) {
    var lines = currentRenderer.text.split('\n');
    var currLineHeight = utils_1.getOrDefault(lineHeight, getLineHeight(context) * 1.2);
    var lineCount = 0;
    var _loop_2 = function (line) {
        if (maxCharacterByLine !== undefined) {
            var words = line.split(' ');
            line = words[0] + ' ';
            for (var j = 1; j < words.length; j++) {
                if (line.length + words[j].length > maxCharacterByLine) {
                    utils_2.computeStrokeFill(currentRenderer, function () { return context.strokeText(line, position.x, position.y + currLineHeight * lineCount); }, function () { return context.fillText(line, position.x, position.y + currLineHeight * lineCount); });
                    lineCount++;
                    line = '';
                }
                line += words[j] + ' ';
            }
        }
        utils_2.computeStrokeFill(currentRenderer, function () { return context.strokeText(line, position.x, position.y + currLineHeight * lineCount); }, function () { return context.fillText(line, position.x, position.y + currLineHeight * lineCount); });
        lineCount++;
    };
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        _loop_2(line);
    }
}
//# sourceMappingURL=../../../../../src/src/renderer/renderers/defaults/object/text-renderer.js.map