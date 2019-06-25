import { Repeater, RepeaterData } from '../repeater.type';

////////////////////////////////
// Count Repeater
////////////////////////////////
export interface CountRepeaterData extends RepeaterData {
    type: 'count';
    count: number;
    currCount?: number;
}

export const COUNT_REPEATER: Repeater<CountRepeaterData> = {
    type: 'count',
    tick: (countRepeater: CountRepeaterData): boolean => {
        if (countRepeater.currCount === undefined) {
            countRepeater.currCount = countRepeater.count;
        } else {
            countRepeater.currCount--;
        }
        return countRepeater.currCount > 0;
    },
    isRepeat: (countRepeater: CountRepeaterData): boolean => {
        return countRepeater.currCount === undefined || countRepeater.currCount > 0;
    },
};
