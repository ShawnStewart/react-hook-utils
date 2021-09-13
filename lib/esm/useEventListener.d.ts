import { MutableRefObject } from 'react';
export declare const useEventListener: (target: EventTarget | MutableRefObject<HTMLElement | null>, event: string, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined) => void;
