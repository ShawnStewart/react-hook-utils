import { useRef } from 'react';
export var usePrevious = function (value) {
    var currentRef = useRef(value);
    var previousRef = useRef();
    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }
    return previousRef.current;
};
