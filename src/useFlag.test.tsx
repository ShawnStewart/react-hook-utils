import React, { FC } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useFlag } from './useFlag';

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

const UseFlagTestComponent: FC<{ defaultValue?: boolean }> = ({ defaultValue }) => {
    const [flag, toggle] = useFlag(defaultValue);

    return (
        <div>
            <div data-testid="value">{String(flag)}</div>
            <button onClick={() => toggle()} data-testid="toggle">
                Toggle
            </button>
            <button onClick={() => toggle(true)} data-testid="set-true">
                Set true
            </button>
            <button onClick={() => toggle(false)} data-testid="set-false">
                Set false
            </button>
        </div>
    );
};

describe('useFlag', () => {
    it('[1] defaults to false', () => {
        act(() => {
            render(<UseFlagTestComponent />, container);
        });
        expect(container?.querySelector("[data-testid='value'")?.textContent).toBe('false');
    });

    it('[2] uses defaultValue argument', () => {
        act(() => {
            render(<UseFlagTestComponent defaultValue={true} />, container);
        });
        expect(container?.querySelector("[data-testid='value'")?.textContent).toBe('true');
    });

    it('[3] toggle function flips state', () => {
        act(() => {
            render(<UseFlagTestComponent />, container);
        });
        const button = container?.querySelector("[data-testid='toggle'");
        const valueNode = container?.querySelector("[data-testid='value'");
        expect(valueNode?.textContent).toBe('false');

        act(() => {
            button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(valueNode?.textContent).toBe('true');

        act(() => {
            button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(valueNode?.textContent).toBe('false');
    });

    it('[4] toggling true only sets true', () => {
        act(() => {
            render(<UseFlagTestComponent />, container);
        });
        const button = container?.querySelector("[data-testid='set-true'");
        const valueNode = container?.querySelector("[data-testid='value'");
        expect(valueNode?.textContent).toBe('false');

        act(() => {
            button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(valueNode?.textContent).toBe('true');

        act(() => {
            button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(valueNode?.textContent).toBe('true');
    });

    it('[5] toggling false only sets false', () => {
        act(() => {
            render(<UseFlagTestComponent defaultValue={true} />, container);
        });
        const button = container?.querySelector("[data-testid='set-false'");
        const valueNode = container?.querySelector("[data-testid='value'");
        expect(valueNode?.textContent).toBe('true');

        act(() => {
            button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(valueNode?.textContent).toBe('false');

        act(() => {
            button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(valueNode?.textContent).toBe('false');
    });
});
