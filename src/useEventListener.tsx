import { MutableRefObject, useEffect, useRef } from 'react';

export const useEventListener = (
    target: EventTarget | MutableRefObject<HTMLElement | null>,
    event: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
): void => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const _target = target instanceof EventTarget ? target : target.current;

        _target?.addEventListener(event, callbackRef.current, options);

        return () => _target?.removeEventListener(event, callbackRef.current, options);
    }, [event, options, target]);
};
