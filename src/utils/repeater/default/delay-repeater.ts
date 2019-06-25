import { Repeater, RepeaterData } from '../repeater.type';

////////////////////////////////
// Delay Repeater
////////////////////////////////
export interface DelayRepeaterData extends RepeaterData {
    type: 'delay';
    delay: number;
    currTime?: number;
}

export const DELAY_REPEATER: Repeater<DelayRepeaterData> = {
    type: 'delay',
    tick: (delayRepeater: DelayRepeaterData, elapsedTime: number): boolean => {
        if (delayRepeater.currTime === undefined || delayRepeater.currTime < 0) {
            delayRepeater.currTime = delayRepeater.delay - elapsedTime;
        } else {
            delayRepeater.currTime -= elapsedTime;
        }
        return delayRepeater.currTime < 0;
    },
    isRepeat: (delayRepeater: DelayRepeaterData): boolean => {
        return delayRepeater.currTime === undefined || delayRepeater.currTime < 0;
    },
};
