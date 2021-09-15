"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionsStorage = exports.useLocalStorage = exports.useStorage = void 0;
var react_1 = require("react");
var useStorage = function (key, defaultValue, storage) {
    var _a = (0, react_1.useState)(function () {
        var jsonValue = storage.getItem(key);
        if (jsonValue) {
            return JSON.parse(jsonValue);
        }
        return defaultValue instanceof Function ? defaultValue() : defaultValue;
    }), state = _a[0], setState = _a[1];
    var clear = (0, react_1.useCallback)(function () { return setState(undefined); }, []);
    (0, react_1.useEffect)(function () {
        state === undefined ? storage.removeItem(key) : storage.setItem(key, JSON.stringify(state));
    }, [key, state, storage]);
    return [state, setState, clear];
};
exports.useStorage = useStorage;
var useLocalStorage = function (key, defaultValue) {
    return (0, exports.useStorage)(key, defaultValue, window.localStorage);
};
exports.useLocalStorage = useLocalStorage;
var useSessionsStorage = function (key, defaultValue) {
    return (0, exports.useStorage)(key, defaultValue, window.sessionStorage);
};
exports.useSessionsStorage = useSessionsStorage;
