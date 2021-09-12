import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delay: number): { set: () => void; clear: () => void } => {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay]);

    const clear = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    useEffect(() => {
        set();

        return clear;
    }, [clear, set]);

    return {
        set,
        clear,
    };
};
