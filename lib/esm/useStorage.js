import { useCallback, useEffect, useState } from 'react';
export var useStorage = function (key, defaultValue, storage) {
    var _a = useState(function () {
        var jsonValue = storage.getItem(key);
        if (jsonValue) {
            return JSON.parse(jsonValue);
        }
        return defaultValue instanceof Function ? defaultValue() : defaultValue;
    }), state = _a[0], setState = _a[1];
    var clear = useCallback(function () { return setState(undefined); }, []);
    useEffect(function () {
        state === undefined ? storage.removeItem(key) : storage.setItem(key, JSON.stringify(state));
    }, [key, state, storage]);
    return [state, setState, clear];
};
export var useLocalStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, window.localStorage);
};
export var useSessionsStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, window.sessionStorage);
};
