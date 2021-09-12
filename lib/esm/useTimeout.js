import { useCallback, useEffect, useRef } from 'react';
export var useTimeout = function (callback, delay) {
    var callbackRef = useRef(callback);
    var timeoutRef = useRef();
    useEffect(function () {
        callbackRef.current = callback;
    }, [callback]);
    var set = useCallback(function () {
        timeoutRef.current = setTimeout(function () { return callbackRef.current(); }, delay);
    }, [delay]);
    var clear = useCallback(function () {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);
    useEffect(function () {
        set();
        return clear;
    }, [clear, set]);
    return {
        set: set,
        clear: clear,
    };
};
