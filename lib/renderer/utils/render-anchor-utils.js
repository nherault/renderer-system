"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils/utils");
exports.targetRetriever = function (params) { return params.target === 'view' ? params.view : params.currentObject; };
var ANCHOR_DIRECTION;
(function (ANCHOR_DIRECTION) {
    ANCHOR_DIRECTION["TOP"] = "TOP";
    ANCHOR_DIRECTION["RIGHT"] = "RIGHT";
    ANCHOR_DIRECTION["LEFT"] = "LEFT";
    ANCHOR_DIRECTION["BOTTOM"] = "BOTTOM";
    ANCHOR_DIRECTION["CORNER_TOP_RIGHT"] = "CORNER_TOP_RIGHT";
    ANCHOR_DIRECTION["CORNER_TOP_LEFT"] = "CORNER_TOP_LEFT";
    ANCHOR_DIRECTION["CORNER_BOTTOM_RIGHT"] = "CORNER_BOTTOM_RIGHT";
    ANCHOR_DIRECTION["CORNER_BOTTOM_LEFT"] = "CORNER_BOTTOM_LEFT";
    ANCHOR_DIRECTION["CENTER"] = "CENTER";
})(ANCHOR_DIRECTION = exports.ANCHOR_DIRECTION || (exports.ANCHOR_DIRECTION = {}));
var ANCHOR_HORIZONTAL_ALIGN;
(function (ANCHOR_HORIZONTAL_ALIGN) {
    ANCHOR_HORIZONTAL_ALIGN["RIGHT"] = "RIGHT";
    ANCHOR_HORIZONTAL_ALIGN["LEFT"] = "LEFT";
    ANCHOR_HORIZONTAL_ALIGN["CENTER"] = "CENTER";
})(ANCHOR_HORIZONTAL_ALIGN = exports.ANCHOR_HORIZONTAL_ALIGN || (exports.ANCHOR_HORIZONTAL_ALIGN = {}));
var ANCHOR_VERTICAL_ALIGN;
(function (ANCHOR_VERTICAL_ALIGN) {
    ANCHOR_VERTICAL_ALIGN["TOP"] = "TOP";
    ANCHOR_VERTICAL_ALIGN["BOTTOM"] = "BOTTOM";
    ANCHOR_VERTICAL_ALIGN["MIDDLE"] = "MIDDLE";
})(ANCHOR_VERTICAL_ALIGN = exports.ANCHOR_VERTICAL_ALIGN || (exports.ANCHOR_VERTICAL_ALIGN = {}));
exports.computePositionWithAnchor = function (targetRetrieverFtc, anchor, size) {
    var entity = targetRetrieverFtc({ target: anchor.target });
    // const isInside = getOrDefault(anchor.inside, true);
    var anchorDirection = utils_1.getOrDefault(anchor.direction, ANCHOR_DIRECTION.CORNER_TOP_LEFT).toUpperCase();
    var entitySize = utils_1.getOrDefault(entity.size, { x: 0, y: 0 });
    var position = computeAnchorDirection(anchorDirection, entity.position, entitySize);
    var horizontalAlignDirection = utils_1.getOrDefault(anchor.horizontalAlign, ANCHOR_HORIZONTAL_ALIGN.LEFT).toUpperCase();
    var verticalAlignDirection = utils_1.getOrDefault(anchor.verticalAlign, ANCHOR_VERTICAL_ALIGN.TOP).toUpperCase();
    var entityAnchorSize = utils_1.getOrDefault(size, { x: 0, y: 0 });
    return computeAnchorVerticalAlign(computeAnchorHorizontalAlign(position, entityAnchorSize, horizontalAlignDirection), entityAnchorSize, verticalAlignDirection);
};
var computeAnchorDirection = function (anchorDirection, position, size) {
    if (anchorDirection === ANCHOR_DIRECTION.TOP) {
        return { x: position.x + size.x / 2, y: position.y };
    }
    else if (anchorDirection === ANCHOR_DIRECTION.BOTTOM) {
        return { x: position.x + size.x / 2, y: position.y + size.y };
    }
    else if (anchorDirection === ANCHOR_DIRECTION.RIGHT) {
        return { x: position.x + size.x, y: position.y + size.y / 2 };
    }
    else if (anchorDirection === ANCHOR_DIRECTION.LEFT) {
        return { x: position.x, y: position.y + size.y / 2 };
    }
    else if (anchorDirection === ANCHOR_DIRECTION.CORNER_TOP_LEFT) {
        return position;
    }
    else if (anchorDirection === ANCHOR_DIRECTION.CORNER_TOP_RIGHT) {
        return { x: position.x + size.x, y: position.y };
    }
    else if (anchorDirection === ANCHOR_DIRECTION.CORNER_BOTTOM_LEFT) {
        return { x: position.x, y: position.y + size.y };
    }
    else if (anchorDirection === ANCHOR_DIRECTION.CORNER_BOTTOM_RIGHT) {
        return { x: position.x + size.x, y: position.y + size.y };
    }
    else if (anchorDirection === ANCHOR_DIRECTION.CENTER) {
        return { x: position.x + size.x / 2, y: position.y + size.y / 2 };
    }
    // Like CORNER_TOP_LEFT
    return position;
};
var computeAnchorHorizontalAlign = function (position, size, alignDirection) {
    if (alignDirection === ANCHOR_HORIZONTAL_ALIGN.CENTER) {
        return { x: position.x - size.x / 2, y: position.y };
    }
    else if (alignDirection === ANCHOR_HORIZONTAL_ALIGN.LEFT) {
        return position;
    }
    else if (alignDirection === ANCHOR_HORIZONTAL_ALIGN.RIGHT) {
        return { x: position.x - size.x, y: position.y };
    }
    // Like LEFT
    return position;
};
var computeAnchorVerticalAlign = function (position, size, alignDirection) {
    if (alignDirection === ANCHOR_VERTICAL_ALIGN.MIDDLE) {
        return { x: position.x, y: position.y - size.y / 2 };
    }
    else if (alignDirection === ANCHOR_VERTICAL_ALIGN.TOP) {
        return position;
    }
    else if (alignDirection === ANCHOR_VERTICAL_ALIGN.BOTTOM) {
        return { x: position.x, y: position.y - size.y };
    }
    // Like TOP
    return position;
};
//# sourceMappingURL=../../../src/src/renderer/utils/render-anchor-utils.js.map