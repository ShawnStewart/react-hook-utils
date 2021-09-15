import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { useStorage } from './useStorage';

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

interface ComponentProps<T> {
    storageKey: string;
    defaultValue: T | (() => T);
    storage: Storage;
    onSetStorage: T | (() => T);
}

const UseStorageTestComponent = <T,>(props: ComponentProps<T>) => {
    const { storageKey, defaultValue, storage, onSetStorage } = props;
    const [storageState, setStorageState, clearStorageState] = useStorage(storageKey, defaultValue, storage);

    return (
        <div>
            <div data-testid="storage-state-value">{String(storageState)}</div>
            <button onClick={() => setStorageState(onSetStorage)} data-testid="set-storage-state">
                Set storage state
            </button>
            <button onClick={clearStorageState} data-testid="clear-storage-state">
                Clear storage state
            </button>
        </div>
    );
};

const TEST_KEY = 'test-key';

describe('useStorage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    afterEach(() => {
        localStorage.clear();
    });

    it('[1] sets defaultValue to storage on init', () => {
        expect(localStorage.getItem(TEST_KEY)).toBeNull();
        act(() => {
            render(
                <UseStorageTestComponent
                    storageKey={TEST_KEY}
                    defaultValue="Testing!"
                    storage={localStorage}
                    onSetStorage={undefined}
                />,
                container,
            );
        });
        const stateNode = container?.querySelector('[data-testid="storage-state-value"');
        expect(getItemSpy).toHaveBeenCalledWith(TEST_KEY);
        expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify('Testing!'));
        expect(stateNode?.textContent).toEqual('Testing!');
    });

    it('[2] defaultValue can be a callback function', () => {
        expect(localStorage.getItem(TEST_KEY)).toBeNull();
        act(() => {
            render(
                <UseStorageTestComponent
                    storageKey={TEST_KEY}
                    defaultValue={() => 12345}
                    storage={localStorage}
                    onSetStorage={undefined}
                />,
                container,
            );
        });
        const stateNode = container?.querySelector('[data-testid="storage-state-value"');
        expect(getItemSpy).toHaveBeenCalledWith(TEST_KEY);
        expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(12345));
        expect(stateNode?.textContent).toEqual('12345');
    });

    it('[3] defaultValue does not overwrite existing value', () => {
        localStorage.setItem(TEST_KEY, JSON.stringify('existing value'));
        expect(localStorage.getItem(TEST_KEY)).not.toBeNull();
        act(() => {
            render(
                <UseStorageTestComponent
                    storageKey={TEST_KEY}
                    defaultValue={12345}
                    storage={localStorage}
                    onSetStorage={undefined}
                />,
                container,
            );
        });
        const stateNode = container?.querySelector('[data-testid="storage-state-value"');
        expect(getItemSpy).toHaveBeenCalledWith(TEST_KEY);
        expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify('existing value'));
        expect(stateNode?.textContent).toEqual('existing value');
    });

    it('[4] setting state saves to storage', () => {
        expect(localStorage.getItem(TEST_KEY)).toBeNull();
        act(() => {
            render(
                <UseStorageTestComponent
                    storageKey={TEST_KEY}
                    defaultValue={''}
                    storage={localStorage}
                    onSetStorage={'new value'}
                />,
                container,
            );
        });
        const stateNode = container?.querySelector('[data-testid="storage-state-value"');
        const setStateButton = container?.querySelector('[data-testid="set-storage-state"');
        expect(getItemSpy).toHaveBeenCalledWith(TEST_KEY);
        expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(''));
        expect(stateNode?.textContent).toEqual('');

        act(() => {
            setStateButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify('new value'));
        expect(stateNode?.textContent).toEqual('new value');
    });

    it('[5] state setter can be passed a function', () => {
        expect(localStorage.getItem(TEST_KEY)).toBeNull();
        act(() => {
            render(
                <UseStorageTestComponent
                    storageKey={TEST_KEY}
                    defaultValue={''}
                    storage={localStorage}
                    onSetStorage={() => 'new value'}
                />,
                container,
            );
        });
        const stateNode = container?.querySelector('[data-testid="storage-state-value"');
        const setStateButton = container?.querySelector('[data-testid="set-storage-state"');
        expect(getItemSpy).toHaveBeenCalledWith(TEST_KEY);
        expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(''));
        expect(stateNode?.textContent).toEqual('');

        act(() => {
            setStateButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify('new value'));
        expect(stateNode?.textContent).toEqual('new value');
    });
});
