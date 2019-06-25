import { Repeater, RepeaterData } from '../repeater.type';

////////////////////////////////
// Modulo Repeater
////////////////////////////////
export interface ModuloRepeaterData extends RepeaterData {
    type: 'modulo';
    modulo: number;
    currCount?: number;
}

export const MODULO_REPEATER: Repeater<ModuloRepeaterData> = {
    type: 'modulo',
    tick: (moduloRepeater: ModuloRepeaterData): boolean => {
        if (moduloRepeater.currCount === undefined) {
            moduloRepeater.currCount = 0;
        } else {
            moduloRepeater.currCount++;
        }
        return moduloRepeater.currCount % moduloRepeater.modulo === 0;
    },
    isRepeat: (moduloRepeater: ModuloRepeaterData): boolean => {
        return moduloRepeater.currCount === undefined || moduloRepeater.currCount % moduloRepeater.modulo === 0;
    },
};
