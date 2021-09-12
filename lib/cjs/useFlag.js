"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFlag = void 0;
var react_1 = require("react");
var useFlag = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var _a = (0, react_1.useState)(defaultValue), value = _a[0], setValue = _a[1];
    var toggle = (0, react_1.useCallback)(function (value) { return setValue(function (prev) { return (typeof value === 'boolean' ? value : !prev); }); }, []);
    return [value, toggle];
};
exports.useFlag = useFlag;
