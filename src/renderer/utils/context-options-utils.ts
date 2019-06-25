import { computeOrDefault, getOrDefault } from '../../utils/utils';
import { ContextOptions, Font } from '../renderers/renderer-data.types';

export function updateContextOptions({context, currentRenderer, contextOptionsDefault}:
    {context: CanvasRenderingContext2D, currentRenderer: any, contextOptionsDefault: ContextOptions}): void {

    if (currentRenderer.fillStyle) {
        currentRenderer.fill = true;
    }
    if (currentRenderer.strokeStyle) {
        currentRenderer.stroke = true;
    }
    const contextOptions = generateContextOptions({currentRenderer, contextOptionsDefault});
    for (const key in contextOptions) {
        if (contextOptions.hasOwnProperty(key)) {
            (context as any)[key] = contextOptions[key];
        }
    }
}

export function generateContextOptions({currentRenderer, contextOptionsDefault}:
    {currentRenderer: any, contextOptionsDefault: ContextOptions}): any {
    const fillStyleContextOptions = generateStyleContextOptions({currentRenderer, contextOptionsDefault, style: 'fillStyle'});
    const strokeStyleContextOptions = generateStyleContextOptions({currentRenderer, contextOptionsDefault, style: 'strokeStyle'});
    const globalContextOptions = generateGlobalContextOptions({currentRenderer, contextOptionsDefault});
    const shadowContextOptions = generateShadowContextOptions({currentRenderer, contextOptionsDefault});
    const lineContextOptions = generateLineContextOptions({currentRenderer, contextOptionsDefault});
    const fontContextOptions = generateFontContextOptions({currentRenderer, contextOptionsDefault});

    return {
        ...fillStyleContextOptions,
        ...strokeStyleContextOptions,
        ...globalContextOptions,
        ...shadowContextOptions,
        ...lineContextOptions,
        ...fontContextOptions,
    };
}

export function generateStyleContextOptions({currentRenderer, contextOptionsDefault, style}:
    {currentRenderer: any, contextOptionsDefault: ContextOptions, style: string}): any {
    // TODO: linear Gradiant / radialGradiant
    const styleGenerated = getOrDefault(currentRenderer[style], (contextOptionsDefault as any)[style]);
    return {[style]: styleGenerated};
}

export function generateGlobalContextOptions({currentRenderer, contextOptionsDefault}:
    {currentRenderer: any, contextOptionsDefault: ContextOptions}): any {
    const globalAlpha = getOrDefault(currentRenderer.opacity, contextOptionsDefault.opacity);
    const globalCompositeOperation = getOrDefault(currentRenderer.compositeOperation, contextOptionsDefault.compositeOperation);
    return {globalAlpha, globalCompositeOperation};
}

export function generateShadowContextOptions({currentRenderer, contextOptionsDefault}:
    {currentRenderer: any, contextOptionsDefault: ContextOptions}): any {
    const shadowBlur = computeOrDefault(
        currentRenderer.shadow,
        (shadow) => getOrDefault(shadow.size, contextOptionsDefault.shadow.size),
        contextOptionsDefault.shadow.size);
    const shadowColor = computeOrDefault(
        currentRenderer.shadow,
        (shadow) => getOrDefault(shadow.shadowColor, contextOptionsDefault.shadow.color),
        contextOptionsDefault.shadow.color);
    const shadowOffset = computeOrDefault(currentRenderer.offset,
        (shadow) => getOrDefault(shadow.offset, contextOptionsDefault.shadow.offset),
        contextOptionsDefault.shadow.offset);
    const shadowOffsetX = shadowOffset.x;
    const shadowOffsetY = shadowOffset.y;
    return {shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY};
}

export function generateLineContextOptions({currentRenderer, contextOptionsDefault}:
    {currentRenderer: any, contextOptionsDefault: ContextOptions}): any {
    const lineCap = getOrDefault(currentRenderer.lineCap, contextOptionsDefault.lineCap);
    const lineJoin = getOrDefault(currentRenderer.lineJoin, contextOptionsDefault.lineJoin);
    const lineWidth = getOrDefault(currentRenderer.lineWidth, contextOptionsDefault.lineWidth);
    const miterLimit = getOrDefault(currentRenderer.miterLimit, contextOptionsDefault.miterLimit);
    return {lineCap, lineJoin, lineWidth, miterLimit};
}

export function generateFontContextOptions({currentRenderer, contextOptionsDefault}:
    {currentRenderer: any, contextOptionsDefault: ContextOptions}): any {
    const textAlign = getOrDefault(currentRenderer.textAlign, contextOptionsDefault.textAlign);
    const textBaseline = getOrDefault(currentRenderer.textBaseline, contextOptionsDefault.textBaseline);

    const fontStyle = computeOrDefault(
        currentRenderer.font,
        (font: Font) => getOrDefault(font.style, contextOptionsDefault.font.style),
        contextOptionsDefault.font.style);
    const fontSize = computeOrDefault(
        currentRenderer.font,
        (font: Font) => getOrDefault(font.size, contextOptionsDefault.font.size),
        contextOptionsDefault.font.size);
    const fontUnit = computeOrDefault(
        currentRenderer.font,
        (font: Font) => getOrDefault(font.unit, contextOptionsDefault.font.unit),
        contextOptionsDefault.font.unit);
    const fontFamily = computeOrDefault(
        currentRenderer.font,
        (font: Font) => getOrDefault(font.family, contextOptionsDefault.font.family),
        contextOptionsDefault.font.family);
    const fontResult = `${fontStyle} ${fontSize}${fontUnit} ${fontFamily}`;
    return {textAlign, textBaseline, font: fontResult};
}
