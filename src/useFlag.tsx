import { useCallback, useState } from 'react';

export const useFlag = (defaultValue = false): [boolean, (value?: boolean) => void] => {
    const [value, setValue] = useState(defaultValue);
    const toggle = useCallback((value?: boolean) => setValue(prev => value || !prev), []);
    return [value, toggle];
};
