export interface Repeater<T extends RepeaterData> {
    type: string;
    tick: (repeaterData: T, data?: any) => boolean;
    isRepeat: (repeaterData: T) => boolean;
}

export interface RepeaterData {
    type: string;
    [propName: string]: any;
}
