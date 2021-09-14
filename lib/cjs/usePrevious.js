"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
var react_1 = require("react");
var usePrevious = function (value) {
    var currentRef = (0, react_1.useRef)(value);
    var previousRef = (0, react_1.useRef)();
    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }
    return previousRef.current;
};
exports.usePrevious = usePrevious;
