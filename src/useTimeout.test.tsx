import React, { FC } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useFlag } from './useFlag';
import { useTimeout } from './useTimeout';

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

const UseTimeoutTestComponent: FC = () => {
    const [flag, setFlag] = useFlag();
    const { set, clear } = useTimeout(() => setFlag(true), 100);

    return (
        <div>
            <div data-testid="flag-value">{String(flag)}</div>
            <button onClick={set} data-testid="set-timeout">
                Set
            </button>
            <button onClick={clear} data-testid="clear-timeout">
                Clear
            </button>
        </div>
    );
};

describe('useTimeout', () => {
    it('[1] calls callback after delay', async () => {
        act(() => {
            render(<UseTimeoutTestComponent />, container);
        });
        const flagNode = container?.querySelector("[data-testid='flag-value']");
        expect(flagNode?.textContent).toBe('false');

        await act(async () => {
            await new Promise(res => setTimeout(res, 100));
        });
        expect(flagNode?.textContent).toBe('true');
    });

    it('[2] set function clears old timeouts and sets a new one', async () => {
        act(() => {
            render(<UseTimeoutTestComponent />, container);
        });
        const flagNode = container?.querySelector("[data-testid='flag-value']");
        const setTimeoutButton = container?.querySelector("[data-testid='set-timeout']");
        expect(flagNode?.textContent).toBe('false');

        await act(async () => {
            await new Promise(res => {
                setTimeout(() => {
                    res(setTimeoutButton?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
                }, 50);
            });
        });
        expect(flagNode?.textContent).toBe('false');

        await act(async () => {
            await new Promise(res => setTimeout(res, 100));
        });
        expect(flagNode?.textContent).toBe('true');
    });

    it('[3] clear function clears timeout', async () => {
        act(() => {
            render(<UseTimeoutTestComponent />, container);
        });
        const flagNode = container?.querySelector("[data-testid='flag-value']");
        const clearTimeoutButton = container?.querySelector("[data-testid='clear-timeout']");
        expect(flagNode?.textContent).toBe('false');

        act(() => {
            clearTimeoutButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        await act(async () => {
            await new Promise(res => setTimeout(res, 100));
        });
        expect(flagNode?.textContent).toBe('false');
    });
});
