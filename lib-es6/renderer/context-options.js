import { COMPOSITE_OPERATION, LINE_CAP, LINE_JOIN, TEXT_ALIGN, TEXT_BASELINE } from './renderers';
export var initialContextOptions = {
    compositeOperation: COMPOSITE_OPERATION.SOURCE_OVER,
    fill: true,
    fillStyle: '',
    font: {
        family: 'sans-serif',
        size: 10,
        style: 'normal',
        unit: 'px',
    },
    lineCap: LINE_CAP.BUTT,
    lineJoin: LINE_JOIN.ROUND,
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
    textAlign: TEXT_ALIGN.START,
    textBaseline: TEXT_BASELINE.ALPHABETIC,
    visible: true,
};
//# sourceMappingURL=../../src/src/renderer/context-options.js.map