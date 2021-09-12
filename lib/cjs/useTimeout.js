"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeout = void 0;
var react_1 = require("react");
var useTimeout = function (callback, delay) {
    var callbackRef = (0, react_1.useRef)(callback);
    var timeoutRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        callbackRef.current = callback;
    }, []);
    var set = (0, react_1.useCallback)(function () {
        timeoutRef.current = setTimeout(function () { return callbackRef.current(); }, delay);
    }, [delay]);
    var clear = (0, react_1.useCallback)(function () {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        set();
        return clear;
    }, [clear, set]);
    return {
        set: set,
        clear: clear,
    };
};
exports.useTimeout = useTimeout;
