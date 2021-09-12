"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTempState = void 0;
var react_1 = require("react");
var useTimeout_1 = require("./useTimeout");
var useTempState = function (delay, defaultValue) {
    var _a = (0, react_1.useState)(defaultValue), state = _a[0], setState = _a[1];
    var _b = (0, useTimeout_1.useTimeout)(function () { return setState(undefined); }, delay), set = _b.set, clear = _b.clear;
    (0, react_1.useEffect)(function () {
        if (state !== undefined) {
            set();
        }
        return clear;
    }, [clear, set, state]);
    return [state, setState];
};
exports.useTempState = useTempState;
