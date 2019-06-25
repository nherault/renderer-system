import { ContextOptions } from '../renderers/renderer-data.types';
export declare function updateContextOptions({ context, currentRenderer, contextOptionsDefault }: {
    context: CanvasRenderingContext2D;
    currentRenderer: any;
    contextOptionsDefault: ContextOptions;
}): void;
export declare function generateContextOptions({ currentRenderer, contextOptionsDefault }: {
    currentRenderer: any;
    contextOptionsDefault: ContextOptions;
}): any;
export declare function generateStyleContextOptions({ currentRenderer, contextOptionsDefault, style }: {
    currentRenderer: any;
    contextOptionsDefault: ContextOptions;
    style: string;
}): any;
export declare function generateGlobalContextOptions({ currentRenderer, contextOptionsDefault }: {
    currentRenderer: any;
    contextOptionsDefault: ContextOptions;
}): any;
export declare function generateShadowContextOptions({ currentRenderer, contextOptionsDefault }: {
    currentRenderer: any;
    contextOptionsDefault: ContextOptions;
}): any;
export declare function generateLineContextOptions({ currentRenderer, contextOptionsDefault }: {
    currentRenderer: any;
    contextOptionsDefault: ContextOptions;
}): any;
export declare function generateFontContextOptions({ currentRenderer, contextOptionsDefault }: {
    currentRenderer: any;
    contextOptionsDefault: ContextOptions;
}): any;
