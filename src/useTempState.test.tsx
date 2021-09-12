import React, { FC } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useTempState } from './useTempState';

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

const UseTempStateTestComponent: FC = () => {
    const [state, setState] = useTempState<string>(100);

    return (
        <div>
            <div data-testid="state-value">{String(state)}</div>
            <button onClick={() => setState('testing!')} data-testid="set-state">
                Set state
            </button>
        </div>
    );
};

describe('useTempState', () => {
    it('[1] state is reset after delay', async () => {
        act(() => {
            render(<UseTempStateTestComponent />, container);
        });
        const stateNode = container?.querySelector("[data-testid='state-value']");
        const setStateButton = container?.querySelector("[data-testid='set-state']");
        expect(stateNode?.textContent).toBe('undefined');

        act(() => {
            setStateButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(stateNode?.textContent).toBe('testing!');

        await act(async () => {
            await new Promise(res => setTimeout(res, 100));
        });
        expect(stateNode?.textContent).toBe('undefined');
    });
});
