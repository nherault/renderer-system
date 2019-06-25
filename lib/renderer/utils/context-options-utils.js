"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils/utils");
function updateContextOptions(_a) {
    var context = _a.context, currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var contextOptions = generateContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    for (var key in contextOptions) {
        if (contextOptions.hasOwnProperty(key)) {
            context[key] = contextOptions[key];
        }
    }
}
exports.updateContextOptions = updateContextOptions;
function generateContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var fillStyleContextOptions = generateStyleContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault, style: 'fillStyle' });
    var strokeStyleContextOptions = generateStyleContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault, style: 'strokeStyle' });
    var globalContextOptions = generateGlobalContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    var shadowContextOptions = generateShadowContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    var lineContextOptions = generateLineContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    var fontContextOptions = generateFontContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    return __assign({}, fillStyleContextOptions, strokeStyleContextOptions, globalContextOptions, shadowContextOptions, lineContextOptions, fontContextOptions);
}
exports.generateContextOptions = generateContextOptions;
function generateStyleContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault, style = _a.style;
    var _b;
    // TODO: linear Gradiant / radialGradiant
    var styleGenerated = utils_1.getOrDefault(currentRenderer[style], contextOptionsDefault[style]);
    return _b = {}, _b[style] = styleGenerated, _b;
}
exports.generateStyleContextOptions = generateStyleContextOptions;
function generateGlobalContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var globalAlpha = utils_1.getOrDefault(currentRenderer.opacity, contextOptionsDefault.opacity);
    var globalCompositeOperation = utils_1.getOrDefault(currentRenderer.compositeOperation, contextOptionsDefault.compositeOperation);
    return { globalAlpha: globalAlpha, globalCompositeOperation: globalCompositeOperation };
}
exports.generateGlobalContextOptions = generateGlobalContextOptions;
function generateShadowContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var shadowBlur = utils_1.computeOrDefault(currentRenderer.shadow, function (shadow) { return utils_1.getOrDefault(shadow.size, contextOptionsDefault.shadow.size); }, contextOptionsDefault.shadow.size);
    var shadowColor = utils_1.computeOrDefault(currentRenderer.shadow, function (shadow) { return utils_1.getOrDefault(shadow.shadowColor, contextOptionsDefault.shadow.color); }, contextOptionsDefault.shadow.color);
    var shadowOffset = utils_1.computeOrDefault(currentRenderer.offset, function (shadow) { return utils_1.getOrDefault(shadow.offset, contextOptionsDefault.shadow.offset); }, contextOptionsDefault.shadow.offset);
    var shadowOffsetX = shadowOffset.x;
    var shadowOffsetY = shadowOffset.y;
    return { shadowBlur: shadowBlur, shadowColor: shadowColor, shadowOffsetX: shadowOffsetX, shadowOffsetY: shadowOffsetY };
}
exports.generateShadowContextOptions = generateShadowContextOptions;
function generateLineContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var lineCap = utils_1.getOrDefault(currentRenderer.lineCap, contextOptionsDefault.lineCap);
    var lineJoin = utils_1.getOrDefault(currentRenderer.lineJoin, contextOptionsDefault.lineJoin);
    var lineWidth = utils_1.getOrDefault(currentRenderer.lineWidth, contextOptionsDefault.lineWidth);
    var miterLimit = utils_1.getOrDefault(currentRenderer.miterLimit, contextOptionsDefault.miterLimit);
    return { lineCap: lineCap, lineJoin: lineJoin, lineWidth: lineWidth, miterLimit: miterLimit };
}
exports.generateLineContextOptions = generateLineContextOptions;
function generateFontContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var textAlign = utils_1.getOrDefault(currentRenderer.textAlign, contextOptionsDefault.textAlign);
    var textBaseline = utils_1.getOrDefault(currentRenderer.textBaseline, contextOptionsDefault.textBaseline);
    var fontStyle = utils_1.computeOrDefault(currentRenderer.font, function (font) { return utils_1.getOrDefault(font.style, contextOptionsDefault.font.style); }, contextOptionsDefault.font.style);
    var fontSize = utils_1.computeOrDefault(currentRenderer.font, function (font) { return utils_1.getOrDefault(font.size, contextOptionsDefault.font.size); }, contextOptionsDefault.font.size);
    var fontUnit = utils_1.computeOrDefault(currentRenderer.font, function (font) { return utils_1.getOrDefault(font.unit, contextOptionsDefault.font.unit); }, contextOptionsDefault.font.unit);
    var fontFamily = utils_1.computeOrDefault(currentRenderer.font, function (font) { return utils_1.getOrDefault(font.family, contextOptionsDefault.font.family); }, contextOptionsDefault.font.family);
    var fontResult = fontStyle + " " + fontSize + fontUnit + " " + fontFamily;
    return { textAlign: textAlign, textBaseline: textBaseline, font: fontResult };
}
exports.generateFontContextOptions = generateFontContextOptions;
//# sourceMappingURL=../../../src/src/renderer/utils/context-options-utils.js.map