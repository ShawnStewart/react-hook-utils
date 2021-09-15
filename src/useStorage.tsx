import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export const useStorage = <T,>(
    key: string,
    defaultValue: T | (() => T),
    storage: Storage,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
    const [state, setState] = useState<T | undefined>(() => {
        const jsonValue = storage.getItem(key);

        if (jsonValue) {
            return JSON.parse(jsonValue);
        }

        return defaultValue instanceof Function ? defaultValue() : defaultValue;
    });

    const clear = useCallback(() => setState(undefined), []);

    useEffect(() => {
        state === undefined ? storage.removeItem(key) : storage.setItem(key, JSON.stringify(state));
    }, [key, state, storage]);

    return [state, setState, clear];
};

export const useLocalStorage = <T,>(
    key: string,
    defaultValue: T | (() => T),
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
    return useStorage(key, defaultValue, window.localStorage);
};

export const useSessionsStorage = <T,>(
    key: string,
    defaultValue: T | (() => T),
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
    return useStorage(key, defaultValue, window.sessionStorage);
};
