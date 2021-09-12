import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useTimeout } from './useTimeout';

export const useTempState = <T,>(
    delay: number,
    defaultValue?: T,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
    const [state, setState] = useState<T | undefined>(defaultValue);
    const { set, clear } = useTimeout(() => setState(undefined), delay);

    useEffect(() => {
        if (state !== undefined) {
            set();
        }
        return clear;
    }, [clear, set, state]);

    return [state, setState];
};
