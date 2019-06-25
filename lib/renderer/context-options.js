"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderers_1 = require("./renderers");
exports.initialContextOptions = {
    compositeOperation: renderers_1.COMPOSITE_OPERATION.SOURCE_OVER,
    fill: true,
    fillStyle: '',
    font: {
        family: 'sans-serif',
        size: 10,
        style: 'normal',
        unit: 'px',
    },
    lineCap: renderers_1.LINE_CAP.BUTT,
    lineJoin: renderers_1.LINE_JOIN.ROUND,
    lineWidth: 1.0,
    miterLimit: 10.0,
    opacity: 1.0,
    shadow: {
        color: 'black',
        offset: { x: 0, y: 0 },
        size: 0,
    },
    stroke: false,
    strokeStyle: '',
    textAlign: renderers_1.TEXT_ALIGN.START,
    textBaseline: renderers_1.TEXT_BASELINE.ALPHABETIC,
    visible: true,
};
//# sourceMappingURL=../../src/src/renderer/context-options.js.map