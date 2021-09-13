import React, { FC } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useEventListener } from './useEventListener';

let container: HTMLDivElement | null = null;

/**
 * Clean the dom between tests
 */
beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
});

afterEach(() => {
    container && unmountComponentAtNode(container);
    container?.remove();
    container = null;
});

const UseEventListenerTestComponent: FC<{ event?: string; cb: () => void }> = props => {
    useEventListener(document, props.event || 'click', props.cb);

    return null;
};

describe('useEventListener', () => {
    it('[1] calls callback on MouseEvent', () => {
        const mockCallback = jest.fn();
        act(() => {
            render(<UseEventListenerTestComponent cb={mockCallback} />, container);
        });
        document.dispatchEvent(new MouseEvent('click'));
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('[2] calls callback on KeyboardEvent', () => {
        const mockCallback = jest.fn();
        act(() => {
            render(<UseEventListenerTestComponent event="keydown" cb={mockCallback} />, container);
        });
        document.dispatchEvent(new KeyboardEvent('keydown'));
        expect(mockCallback).toHaveBeenCalledTimes(1);
        act(() => {
            render(<UseEventListenerTestComponent event="keyup" cb={mockCallback} />, container);
        });
        document.dispatchEvent(new KeyboardEvent('keyup'));
        expect(mockCallback).toHaveBeenCalledTimes(2);
        act(() => {
            render(<UseEventListenerTestComponent event="keypress" cb={mockCallback} />, container);
        });
        document.dispatchEvent(new KeyboardEvent('keypress'));
        expect(mockCallback).toHaveBeenCalledTimes(3);
    });

    it('[3] calls callback on FocusEvent', () => {
        const mockCallback = jest.fn();
        act(() => {
            render(<UseEventListenerTestComponent event="focus" cb={mockCallback} />, container);
        });
        document.dispatchEvent(new FocusEvent('focus'));
        expect(mockCallback).toHaveBeenCalledTimes(1);

        act(() => {
            render(<UseEventListenerTestComponent event="blur" cb={mockCallback} />, container);
        });
        document.dispatchEvent(new FocusEvent('blur'));
        expect(mockCallback).toHaveBeenCalledTimes(2);
    });
});
