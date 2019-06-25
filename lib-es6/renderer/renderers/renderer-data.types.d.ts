import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
export declare enum TEXT_ALIGN {
    START = "start",
    END = "end",
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center"
}
export declare enum TEXT_BASELINE {
    TOP = "top",
    HANGING = "hanging",
    MIDDLE = "middle",
    ALPHABETIC = "alphabetic",
    IDEOGRAPHIC = "ideographique",
    BOTTOM = "bottom"
}
export declare enum COMPOSITE_OPERATION {
    SOURCE_OVER = "source-over",
    SOURCE_ATOP = "source-atop",
    SOURCE_IN = "source-in",
    SOURCE_OUT = "source-out",
    DESTINATION_OVER = "destination-over",
    DESTINATION_ATOP = "destination-atop",
    DESTINATION_IN = "destination-in",
    DESTINATION_OUT = "destination-out",
    LIGHTER = "lighter",
    COPY = "copy",
    XOR = "xor"
}
export declare enum LINE_CAP {
    BUTT = "butt",
    ROUND = "round",
    SQUARE = "square"
}
export declare enum LINE_JOIN {
    BEVEL = "bevel",
    ROUND = "round",
    MITER = "miter"
}
export declare enum TYPE_RENDERER {
    TEXT = "text",
    LINE = "line",
    TRIANGLE = "triangle",
    ARC = "arc",
    CIRCLE = "circle",
    RECTANGLE = "rectangle",
    RESOURCE = "resource",
    CANVAS = "canvas",
    IMAGE = "image",
    PATH2D = "path2D",
    FORM = "form"
}
export declare enum PATH_DATA {
    LINE_TO = "lineTo",
    RECTANGLE = "rectangle",
    ARC = "arc",
    ARC_TO = "arcTo",
    BEZIER_CURVE_TO = "bezierCurveTo",
    QUADRIC_CURVE_TO = "quadraticCurveTo",
    MOVE_TO = "moveTo"
}
export interface Shadow {
    size: number;
    color?: string;
    offset?: Vector2DData;
}
export interface Font {
    style?: string;
    size?: number;
    family?: string;
    unit?: string;
}
export interface ContextOptionsParams {
    strokeStyle?: ContextStyle;
    fillStyle?: ContextStyle;
    opacity?: number;
    compositeOperation?: COMPOSITE_OPERATION;
    shadow?: Shadow;
    lineCap?: LINE_CAP;
    lineJoin?: LINE_JOIN;
    lineWidth?: number;
    miterLimit?: number;
    font?: Font;
    textAlign?: TEXT_ALIGN;
    textBaseline?: TEXT_BASELINE;
    visible?: boolean;
}
export interface ContextOptions {
    strokeStyle: ContextStyle;
    stroke: boolean;
    fill: boolean;
    fillStyle: ContextStyle;
    opacity: number;
    compositeOperation: COMPOSITE_OPERATION;
    shadow: Shadow;
    lineCap: LINE_CAP;
    lineJoin: LINE_JOIN;
    lineWidth: number;
    miterLimit: number;
    font: Font;
    textAlign: TEXT_ALIGN;
    textBaseline: TEXT_BASELINE;
    visible: boolean;
}
export interface PathLineToData {
    type: PATH_DATA.LINE_TO;
    to: Vector2DData;
}
export interface PathArcData {
    type: PATH_DATA.ARC;
    position: Vector2DData;
    radius: number;
    startAngle: number;
    endAngle: number;
}
export interface PathArcToData {
    type: PATH_DATA.ARC_TO;
    from: Vector2DData;
    to: Vector2DData;
    radius: number;
}
export interface PathBezierCurveToData {
    type: PATH_DATA.BEZIER_CURVE_TO;
    cp1: Vector2DData;
    cp2: Vector2DData;
    end: Vector2DData;
}
export interface PathQuadricCurveToData {
    type: PATH_DATA.QUADRIC_CURVE_TO;
    cp: Vector2DData;
    end: Vector2DData;
}
export interface PathRectangleData {
    type: PATH_DATA.RECTANGLE;
    position: Vector2DData;
    size: Vector2DData;
}
export interface PathMoveToData {
    type: PATH_DATA.MOVE_TO;
    to: Vector2DData;
}
export declare type Forms2D = PathLineToData | PathArcData | PathArcToData | PathBezierCurveToData | PathQuadricCurveToData | PathRectangleData | PathMoveToData;
export interface Path2DRendererData extends ContextOptionsParams {
    type: TYPE_RENDERER.PATH2D;
    path: Forms2D[];
    stroke?: boolean;
    fill?: boolean;
}
export interface TextData {
    type: TYPE_RENDERER.TEXT;
    text: string;
    offsetPosition?: Vector2DData;
    stroke?: boolean;
    fill?: boolean;
    anchor?: string;
    autoScale?: string;
}
export interface TextRendererData extends TextData, ContextOptionsParams {
}
export interface LineData {
    type: TYPE_RENDERER.LINE;
    offsetStart?: Vector2DData;
    offsetEnd?: Vector2DData;
}
export interface LineRendererData extends LineData, ContextOptionsParams {
}
export interface TriangleData {
    type: TYPE_RENDERER.TRIANGLE;
    offsetPosition?: Vector2DData;
    stroke?: boolean;
    fill?: boolean;
}
export interface TriangleRendererData extends TriangleData, ContextOptionsParams {
}
export interface CircleData {
    type: TYPE_RENDERER.CIRCLE;
    offsetPosition?: Vector2DData;
    radius?: number;
    stroke?: boolean;
    fill?: boolean;
}
export interface CircleRendererData extends CircleData, ContextOptionsParams {
}
export interface ArcData {
    type: TYPE_RENDERER.ARC;
    offsetPosition?: Vector2DData;
    radius?: number;
    stroke?: boolean;
    fill?: boolean;
    startAngle?: number;
    endAngle?: number;
}
export interface ArcRendererData extends ArcData, ContextOptionsParams {
}
export interface RectangleData {
    type: TYPE_RENDERER.RECTANGLE;
    offsetPosition?: Vector2DData;
    size?: Vector2DData;
    stroke?: boolean;
    fill?: boolean;
}
export interface RectangleRendererData extends RectangleData, ContextOptionsParams {
}
export interface ImageData {
    type: TYPE_RENDERER.IMAGE;
    source: HTMLImageElement;
}
export interface ImageRendererData extends ImageData, ContextOptionsParams {
}
export interface CanvasData {
    type: TYPE_RENDERER.CANVAS;
    source: HTMLCanvasElement;
}
export interface CanvasRendererData extends CanvasData, ContextOptionsParams {
}
export interface ResourceData {
    type: TYPE_RENDERER.RESOURCE;
    resourceId: string;
}
export interface ResourceRendererData extends ResourceData, ContextOptionsParams {
}
export interface FormData {
    type: TYPE_RENDERER.FORM;
    formId: string;
    stroke?: boolean;
    fill?: boolean;
}
export interface FormRendererData extends FormData, ContextOptionsParams {
}
export interface LinearGradientStyle {
    type: 'linearGradient';
    start: Vector2DData;
    end: Vector2DData;
    colors: Array<{
        step: number;
        color: string;
    }>;
}
export interface RadialGrandientStyle {
    type: 'radialGradient';
    start: Vector2DData;
    end: Vector2DData;
    radiusStart: number;
    radiusEnd: number;
    colors: Array<{
        step: number;
        color: string;
    }>;
}
export declare type ContextStyle = string | LinearGradientStyle | RadialGrandientStyle;
