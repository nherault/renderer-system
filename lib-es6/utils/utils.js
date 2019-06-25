export var getOrDefault = function (value, defaultValue) { return value === undefined ? defaultValue : value; };
export var computeOrDefault = function (value, computeFunction, defaultValue) {
    return value === undefined ? defaultValue : computeFunction(value);
};
export var radToDeg = function (value) { return value * 180 / Math.PI; };
export var degToRad = function (value) { return value * Math.PI / 180; };
//# sourceMappingURL=../../src/src/utils/utils.js.map