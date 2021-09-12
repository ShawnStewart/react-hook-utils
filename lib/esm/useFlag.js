import { useCallback, useState } from 'react';
export var useFlag = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var _a = useState(defaultValue), value = _a[0], setValue = _a[1];
    var toggle = useCallback(function (value) { return setValue(function (prev) { return (typeof value === 'boolean' ? value : !prev); }); }, []);
    return [value, toggle];
};
