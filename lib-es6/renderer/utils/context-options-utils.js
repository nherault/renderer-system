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
import { computeOrDefault, getOrDefault } from '../../utils/utils';
export function updateContextOptions(_a) {
    var context = _a.context, currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var contextOptions = generateContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    for (var key in contextOptions) {
        if (contextOptions.hasOwnProperty(key)) {
            context[key] = contextOptions[key];
        }
    }
}
export function generateContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var fillStyleContextOptions = generateStyleContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault, style: 'fillStyle' });
    var strokeStyleContextOptions = generateStyleContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault, style: 'strokeStyle' });
    var globalContextOptions = generateGlobalContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    var shadowContextOptions = generateShadowContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    var lineContextOptions = generateLineContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    var fontContextOptions = generateFontContextOptions({ currentRenderer: currentRenderer, contextOptionsDefault: contextOptionsDefault });
    return __assign({}, fillStyleContextOptions, strokeStyleContextOptions, globalContextOptions, shadowContextOptions, lineContextOptions, fontContextOptions);
}
export function generateStyleContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault, style = _a.style;
    var _b;
    // TODO: linear Gradiant / radialGradiant
    var styleGenerated = getOrDefault(currentRenderer[style], contextOptionsDefault[style]);
    return _b = {}, _b[style] = styleGenerated, _b;
}
export function generateGlobalContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var globalAlpha = getOrDefault(currentRenderer.opacity, contextOptionsDefault.opacity);
    var globalCompositeOperation = getOrDefault(currentRenderer.compositeOperation, contextOptionsDefault.compositeOperation);
    return { globalAlpha: globalAlpha, globalCompositeOperation: globalCompositeOperation };
}
export function generateShadowContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var shadowBlur = computeOrDefault(currentRenderer.shadow, function (shadow) { return getOrDefault(shadow.size, contextOptionsDefault.shadow.size); }, contextOptionsDefault.shadow.size);
    var shadowColor = computeOrDefault(currentRenderer.shadow, function (shadow) { return getOrDefault(shadow.shadowColor, contextOptionsDefault.shadow.color); }, contextOptionsDefault.shadow.color);
    var shadowOffset = computeOrDefault(currentRenderer.offset, function (shadow) { return getOrDefault(shadow.offset, contextOptionsDefault.shadow.offset); }, contextOptionsDefault.shadow.offset);
    var shadowOffsetX = shadowOffset.x;
    var shadowOffsetY = shadowOffset.y;
    return { shadowBlur: shadowBlur, shadowColor: shadowColor, shadowOffsetX: shadowOffsetX, shadowOffsetY: shadowOffsetY };
}
export function generateLineContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var lineCap = getOrDefault(currentRenderer.lineCap, contextOptionsDefault.lineCap);
    var lineJoin = getOrDefault(currentRenderer.lineJoin, contextOptionsDefault.lineJoin);
    var lineWidth = getOrDefault(currentRenderer.lineWidth, contextOptionsDefault.lineWidth);
    var miterLimit = getOrDefault(currentRenderer.miterLimit, contextOptionsDefault.miterLimit);
    return { lineCap: lineCap, lineJoin: lineJoin, lineWidth: lineWidth, miterLimit: miterLimit };
}
export function generateFontContextOptions(_a) {
    var currentRenderer = _a.currentRenderer, contextOptionsDefault = _a.contextOptionsDefault;
    var textAlign = getOrDefault(currentRenderer.textAlign, contextOptionsDefault.textAlign);
    var textBaseline = getOrDefault(currentRenderer.textBaseline, contextOptionsDefault.textBaseline);
    var fontStyle = computeOrDefault(currentRenderer.font, function (font) { return getOrDefault(font.style, contextOptionsDefault.font.style); }, contextOptionsDefault.font.style);
    var fontSize = computeOrDefault(currentRenderer.font, function (font) { return getOrDefault(font.size, contextOptionsDefault.font.size); }, contextOptionsDefault.font.size);
    var fontUnit = computeOrDefault(currentRenderer.font, function (font) { return getOrDefault(font.unit, contextOptionsDefault.font.unit); }, contextOptionsDefault.font.unit);
    var fontFamily = computeOrDefault(currentRenderer.font, function (font) { return getOrDefault(font.family, contextOptionsDefault.font.family); }, contextOptionsDefault.font.family);
    var fontResult = fontStyle + " " + fontSize + fontUnit + " " + fontFamily;
    return { textAlign: textAlign, textBaseline: textBaseline, font: fontResult };
}
//# sourceMappingURL=../../../src/src/renderer/utils/context-options-utils.js.map