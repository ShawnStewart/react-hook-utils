import { Dispatch, SetStateAction } from 'react';
export declare const useStorage: <T>(key: string, defaultValue: T | (() => T), storage: Storage) => [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void];
export declare const useLocalStorage: <T>(key: string, defaultValue: T | (() => T)) => [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void];
export declare const useSessionsStorage: <T>(key: string, defaultValue: T | (() => T)) => [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void];
