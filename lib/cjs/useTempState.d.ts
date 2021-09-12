import { Dispatch, SetStateAction } from 'react';
export declare const useTempState: <T>(delay: number, defaultValue?: T | undefined) => [T | undefined, Dispatch<SetStateAction<T | undefined>>];
