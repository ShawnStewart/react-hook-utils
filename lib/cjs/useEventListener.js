"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventListener = void 0;
var react_1 = require("react");
var useEventListener = function (target, event, callback, options) {
    var callbackRef = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(function () {
        callbackRef.current = callback;
    }, [callback]);
    (0, react_1.useEffect)(function () {
        var _target = target instanceof EventTarget ? target : target.current;
        _target === null || _target === void 0 ? void 0 : _target.addEventListener(event, callbackRef.current, options);
        return function () { return _target === null || _target === void 0 ? void 0 : _target.removeEventListener(event, callbackRef.current, options); };
    }, [event, options, target]);
};
exports.useEventListener = useEventListener;
