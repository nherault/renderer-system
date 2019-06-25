export const getOrDefault = (value: any, defaultValue: any) => value === undefined ? defaultValue : value;
export const computeOrDefault = (value: any, computeFunction: (value: any) => void, defaultValue: any): any =>
    value === undefined ? defaultValue : computeFunction(value);
export const radToDeg = (value: number) => value * 180 / Math.PI;
export const degToRad = (value: number) => value * Math.PI / 180;
