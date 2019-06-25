import { TYPE_RENDERER } from '../renderers';
import { renderArc, renderCanvasImage, renderCircle, renderLine, renderPath2D, renderRectangle, renderResource, renderText, renderTriangle  } from '../renderers/defaults/object';

////////////////////////////////////////
// Object renderers
////////////////////////////////////////
export const initialObjectRenderers = {
    [TYPE_RENDERER.CANVAS]: renderCanvasImage,
    [TYPE_RENDERER.IMAGE]: renderCanvasImage,
    [TYPE_RENDERER.RESOURCE]: renderResource,
    [TYPE_RENDERER.TEXT]: renderText,
    [TYPE_RENDERER.LINE]: renderLine,
    [TYPE_RENDERER.TRIANGLE]: renderTriangle,
    [TYPE_RENDERER.ARC]: renderArc,
    [TYPE_RENDERER.CIRCLE]: renderCircle,
    [TYPE_RENDERER.RECTANGLE]: renderRectangle,
    [TYPE_RENDERER.PATH2D]: renderPath2D,
};
