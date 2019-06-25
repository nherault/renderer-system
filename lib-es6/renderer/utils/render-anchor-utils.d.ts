import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { View } from '../commons/view/view.types';
export interface TargetRetrieverParams {
    target: any;
    currentObject?: any;
    view?: View;
}
export declare const targetRetriever: (params: TargetRetrieverParams) => any;
export declare enum ANCHOR_DIRECTION {
    TOP = "TOP",
    RIGHT = "RIGHT",
    LEFT = "LEFT",
    BOTTOM = "BOTTOM",
    CORNER_TOP_RIGHT = "CORNER_TOP_RIGHT",
    CORNER_TOP_LEFT = "CORNER_TOP_LEFT",
    CORNER_BOTTOM_RIGHT = "CORNER_BOTTOM_RIGHT",
    CORNER_BOTTOM_LEFT = "CORNER_BOTTOM_LEFT",
    CENTER = "CENTER"
}
export declare enum ANCHOR_HORIZONTAL_ALIGN {
    RIGHT = "RIGHT",
    LEFT = "LEFT",
    CENTER = "CENTER"
}
export declare enum ANCHOR_VERTICAL_ALIGN {
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    MIDDLE = "MIDDLE"
}
export interface AnchorParameters {
    target: string;
    direction?: ANCHOR_DIRECTION;
    horizontalAlign?: ANCHOR_HORIZONTAL_ALIGN;
    verticalAlign?: ANCHOR_VERTICAL_ALIGN;
    inside?: boolean;
}
export declare const computePositionWithAnchor: (targetRetrieverFtc: (params: TargetRetrieverParams) => any, anchor: AnchorParameters, size?: {
    x: number;
    y: number;
} | undefined) => Vector2DData;
