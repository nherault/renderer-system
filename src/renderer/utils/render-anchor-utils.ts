import { getOrDefault } from '../../utils/utils';
import { Vector2DData } from '../commons/vector-2d/vector-2d.types';
import { View } from '../scene/scene.types';

export interface TargetRetrieverParams {
    target: any;
    currentObject?: any;
    view?: View;
}

export const targetRetriever = (params: TargetRetrieverParams) => params.target === 'view' ? params.view : params.currentObject;

export enum ANCHOR_DIRECTION {
    TOP = 'TOP',
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
    BOTTOM = 'BOTTOM',
    CORNER_TOP_RIGHT = 'CORNER_TOP_RIGHT',
    CORNER_TOP_LEFT = 'CORNER_TOP_LEFT',
    CORNER_BOTTOM_RIGHT = 'CORNER_BOTTOM_RIGHT',
    CORNER_BOTTOM_LEFT = 'CORNER_BOTTOM_LEFT',
    CENTER = 'CENTER',
}

export enum ANCHOR_HORIZONTAL_ALIGN {
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
    CENTER = 'CENTER',
}

export enum ANCHOR_VERTICAL_ALIGN {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
    MIDDLE = 'MIDDLE',
}

export interface AnchorParameters {
    target: string;
    direction?: ANCHOR_DIRECTION;
    horizontalAlign?: ANCHOR_HORIZONTAL_ALIGN;  // TODO: put in general in all renderer
    verticalAlign?: ANCHOR_VERTICAL_ALIGN;  // TODO: put in general in all renderer
    inside?: boolean; // TODO !!
}

export const computePositionWithAnchor = (
    targetRetrieverFtc: (params: TargetRetrieverParams) => any, anchor: AnchorParameters, size?: {x: number, y: number}) => {
    const entity = targetRetrieverFtc({ target: anchor.target });
    // const isInside = getOrDefault(anchor.inside, true);
    const anchorDirection = getOrDefault(anchor.direction, ANCHOR_DIRECTION.CORNER_TOP_LEFT).toUpperCase();
    const entitySize = getOrDefault(entity.size, {x: 0, y: 0});
    const position = computeAnchorDirection(anchorDirection, entity.position, entitySize);

    const horizontalAlignDirection = getOrDefault(anchor.horizontalAlign, ANCHOR_HORIZONTAL_ALIGN.LEFT).toUpperCase();
    const verticalAlignDirection = getOrDefault(anchor.verticalAlign, ANCHOR_VERTICAL_ALIGN.TOP).toUpperCase();
    const entityAnchorSize = getOrDefault(size, {x: 0, y: 0});
    return computeAnchorVerticalAlign(
        computeAnchorHorizontalAlign(position, entityAnchorSize, horizontalAlignDirection),
        entityAnchorSize,
        verticalAlignDirection,
    );
};

const computeAnchorDirection = (anchorDirection: ANCHOR_DIRECTION, position: Vector2DData, size: Vector2DData) => {
    if (anchorDirection === ANCHOR_DIRECTION.TOP) {
        return {x: position.x + size.x / 2, y: position.y};
    } else if (anchorDirection === ANCHOR_DIRECTION.BOTTOM) {
        return {x: position.x + size.x / 2, y: position.y + size.y};
    } else if (anchorDirection === ANCHOR_DIRECTION.RIGHT) {
        return {x: position.x + size.x, y: position.y + size.y / 2};
    } else if (anchorDirection === ANCHOR_DIRECTION.LEFT) {
        return {x: position.x, y: position.y + size.y / 2};
    } else if (anchorDirection === ANCHOR_DIRECTION.CORNER_TOP_LEFT) {
        return position;
    } else if (anchorDirection === ANCHOR_DIRECTION.CORNER_TOP_RIGHT) {
        return {x: position.x + size.x, y: position.y};
    } else if (anchorDirection === ANCHOR_DIRECTION.CORNER_BOTTOM_LEFT) {
        return {x: position.x, y: position.y + size.y};
    } else if (anchorDirection === ANCHOR_DIRECTION.CORNER_BOTTOM_RIGHT) {
        return {x: position.x + size.x, y: position.y + size.y};
    } else if (anchorDirection === ANCHOR_DIRECTION.CENTER) {
        return {x: position.x + size.x / 2, y: position.y + size.y / 2};
    }
    // Like CORNER_TOP_LEFT
    return position;
};

const computeAnchorHorizontalAlign = (position: Vector2DData, size: Vector2DData, alignDirection: ANCHOR_HORIZONTAL_ALIGN) => {
    if (alignDirection === ANCHOR_HORIZONTAL_ALIGN.CENTER) {
        return {x: position.x - size.x / 2, y: position.y};
    } else if (alignDirection === ANCHOR_HORIZONTAL_ALIGN.LEFT) {
        return position;
    } else if (alignDirection === ANCHOR_HORIZONTAL_ALIGN.RIGHT) {
        return {x: position.x - size.x , y: position.y};
    }
    // Like LEFT
    return position;
};

const computeAnchorVerticalAlign = (position: Vector2DData, size: Vector2DData, alignDirection: ANCHOR_VERTICAL_ALIGN) => {
    if (alignDirection === ANCHOR_VERTICAL_ALIGN.MIDDLE) {
        return {x: position.x, y: position.y - size.y / 2};
    } else if (alignDirection === ANCHOR_VERTICAL_ALIGN.TOP) {
        return position;
    } else if (alignDirection === ANCHOR_VERTICAL_ALIGN.BOTTOM) {
        return {x: position.x, y: position.y - size.y};
    }
    // Like TOP
    return position;
};
