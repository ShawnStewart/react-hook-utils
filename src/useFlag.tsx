import { useCallback, useState } from 'react';

export const useFlag = (defaultValue = false): [boolean, (value?: boolean) => void] => {
    const [value, setValue] = useState(defaultValue);
    const toggle = useCallback((value?: boolean) => setValue(prev => (typeof value === 'boolean' ? value : !prev)), []);
    return [value, toggle];
};
