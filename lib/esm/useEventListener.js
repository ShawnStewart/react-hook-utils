import { useEffect, useRef } from 'react';
export var useEventListener = function (target, event, callback, options) {
    var callbackRef = useRef(callback);
    useEffect(function () {
        callbackRef.current = callback;
    }, [callback]);
    useEffect(function () {
        var _target = target instanceof EventTarget ? target : target.current;
        _target === null || _target === void 0 ? void 0 : _target.addEventListener(event, callbackRef.current, options);
        return function () { return _target === null || _target === void 0 ? void 0 : _target.removeEventListener(event, callbackRef.current, options); };
    }, [event, options, target]);
};
