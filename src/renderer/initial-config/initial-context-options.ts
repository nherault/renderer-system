import { COMPOSITE_OPERATION, ContextOptions, ContextStyle, LINE_CAP, LINE_JOIN, TEXT_ALIGN, TEXT_BASELINE } from '../renderers';

export const initialContextOptions: ContextOptions = {
    compositeOperation: COMPOSITE_OPERATION.SOURCE_OVER,
    fill: true,
    fillStyle: '' as ContextStyle,
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
        offset: {x: 0, y: 0},
        size: 0,
    },
    stroke: false,
    strokeStyle: '' as ContextStyle,
    textAlign: TEXT_ALIGN.START,
    textBaseline: TEXT_BASELINE.HANGING,
    visible: true,
};
