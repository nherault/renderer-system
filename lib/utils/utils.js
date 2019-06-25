"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrDefault = function (value, defaultValue) { return value === undefined ? defaultValue : value; };
exports.computeOrDefault = function (value, computeFunction, defaultValue) {
    return value === undefined ? defaultValue : computeFunction(value);
};
exports.radToDeg = function (value) { return value * 180 / Math.PI; };
exports.degToRad = function (value) { return value * Math.PI / 180; };
//# sourceMappingURL=../../src/src/utils/utils.js.map