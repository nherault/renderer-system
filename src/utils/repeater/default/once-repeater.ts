import { Repeater, RepeaterData } from '../repeater.type';

////////////////////////////////
// Once Repeater
////////////////////////////////
export interface OnceRepeaterData extends RepeaterData {
    type: 'once';
    isDoneOnce?: boolean;
}

export const ONCE_REPEATER: Repeater<OnceRepeaterData> = {
    type: 'once',
    tick: (onceRepeater: OnceRepeaterData): boolean => {
        if (onceRepeater.isDoneOnce === undefined) {
            onceRepeater.isDoneOnce = true;
            return true;
        }
        return false;
    },
    isRepeat: (onceRepeater: OnceRepeaterData): boolean => {
        return onceRepeater.isDoneOnce === undefined || onceRepeater.isDoneOnce;
    },
};
