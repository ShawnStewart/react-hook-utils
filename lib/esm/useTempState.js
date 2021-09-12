import { useEffect, useState } from 'react';
import { useTimeout } from './useTimeout';
export var useTempState = function (delay, defaultValue) {
    var _a = useState(defaultValue), state = _a[0], setState = _a[1];
    var _b = useTimeout(function () { return setState(undefined); }, delay), set = _b.set, clear = _b.clear;
    useEffect(function () {
        if (state !== undefined) {
            set();
        }
        return clear;
    }, [clear, set, state]);
    return [state, setState];
};
