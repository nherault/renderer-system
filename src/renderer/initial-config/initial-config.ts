import { RenderSystemConfig } from '../render-system.types';
import { initialContextOptions } from './initial-context-options';
import { initialFilterRenderers } from './initial-filter-renderers';
import { initialObjectRenderers } from './initial-object-renderers';
import { initialSceneRenderers } from './initial-scene-renderers';
import { RepeaterManager } from '../../utils/repeater/repeater-manager';
import { COUNT_REPEATER, MODULO_REPEATER, DELAY_REPEATER, ONCE_REPEATER } from '../../utils/repeater/default/';

const repeaterManager: RepeaterManager = new RepeaterManager()
    .addRepeater(COUNT_REPEATER)
    .addRepeater(MODULO_REPEATER)
    .addRepeater(DELAY_REPEATER)
    .addRepeater(ONCE_REPEATER);

export const initialConfig: RenderSystemConfig = {
    contextOptions: initialContextOptions,
    renderers: {
        filters: initialFilterRenderers,
        objects: initialObjectRenderers as any, // TODO: check the right types
        scenes: initialSceneRenderers,
    },
    resourceFinder: () => ({}),
    repeater: repeaterManager,
};
