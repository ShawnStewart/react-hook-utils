import React, { FC, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { usePrevious } from './usePrevious';

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

const UsePreviousTestComponent: FC<{ defaultValue?: number }> = ({ defaultValue }) => {
    const [state, setState] = useState(defaultValue);
    const previousValue = usePrevious(state);

    return (
        <div>
            <div data-testid="current-state">{String(state)}</div>
            <div data-testid="previous-state">{String(previousValue)}</div>
            <button onClick={() => setState(prev => (prev === undefined ? 1 : prev + 1))} data-testid="set-state">
                Set state
            </button>
        </div>
    );
};

describe('usePrevious', () => {
    it('[1] previous state is initialized as undefined', () => {
        act(() => {
            render(<UsePreviousTestComponent defaultValue={1} />, container);
        });
        const curStateNode = container?.querySelector("[data-testid='current-state']");
        const prevStateNode = container?.querySelector("[data-testid='previous-state']");
        expect(curStateNode?.textContent).toBe('1');
        expect(prevStateNode?.textContent).toBe('undefined');
    });

    it('[2] saves previous state when state is updated', () => {
        act(() => {
            render(<UsePreviousTestComponent defaultValue={1} />, container);
        });
        const curStateNode = container?.querySelector("[data-testid='current-state']");
        const prevStateNode = container?.querySelector("[data-testid='previous-state']");
        const setStateButton = container?.querySelector("[data-testid='set-state']");
        expect(curStateNode?.textContent).toBe('1');
        expect(prevStateNode?.textContent).toBe('undefined');

        act(() => {
            setStateButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(curStateNode?.textContent).toBe('2');
        expect(prevStateNode?.textContent).toBe('1');
    });

    it('[3] can be initialized undefined', () => {
        act(() => {
            render(<UsePreviousTestComponent defaultValue={undefined} />, container);
        });
        const curStateNode = container?.querySelector("[data-testid='current-state']");
        const prevStateNode = container?.querySelector("[data-testid='previous-state']");
        const setStateButton = container?.querySelector("[data-testid='set-state']");
        expect(curStateNode?.textContent).toBe('undefined');
        expect(prevStateNode?.textContent).toBe('undefined');

        act(() => {
            setStateButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(curStateNode?.textContent).toBe('1');
        expect(prevStateNode?.textContent).toBe('undefined');

        act(() => {
            setStateButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(curStateNode?.textContent).toBe('2');
        expect(prevStateNode?.textContent).toBe('1');
    });
});
