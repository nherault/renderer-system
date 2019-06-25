import { Repeater, RepeaterData } from './repeater.type';

export class RepeaterManager {
    private repeaterPropName: string;
    private repeaters: {[props: string]: Repeater<any>};

    constructor() {
        this.repeaterPropName = 'repeater';
        this.repeaters = {};
    }

    public setRepeaterProp(repeaterPropName: string): RepeaterManager {
        if (repeaterPropName.trim().length > 0) {
            this.repeaterPropName = repeaterPropName;
        }
        return this;
    }

    public addRepeater(repeater: Repeater<any>): RepeaterManager {
        this.repeaters[repeater.type] = repeater;
        return this;
    }

    public tick<T extends RepeaterData>(objToRepeat: {[key: string]: T}, data?: any): boolean {
        const repeaterData = objToRepeat[this.repeaterPropName];
        if (repeaterData !== undefined) {
            const repeater = this.repeaters[repeaterData.type];
            if (repeater !== undefined) {
                return repeater.tick(repeaterData, data);
            }
        }
        return true;
    }

    public isRepeat<T extends RepeaterData>(objToRepeat: {[key: string]: T}) {
        const repeaterData = objToRepeat[this.repeaterPropName];
        if (repeaterData !== undefined) {
            const repeater = this.repeaters[repeaterData.type];
            if (repeater !== undefined) {
                return repeater.isRepeat(repeaterData);
            }
        }
        return true;
    }
}
