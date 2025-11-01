import { renderHook, act } from "@testing-library/react";
import { vi, expect, beforeEach, describe, test } from "vitest";

import { useLocalStorage } from "../../src/hooks/useLocalStorage";

vi.stubGlobal(
  "localStorage",
  (await import("../../__mocks__/localStorage")).default
);

describe("useLocalStorage", () => {
  const TEST_KEY = "test-key";
  const INITIAL_VALUE = "initial-data";

  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize with initial value and save to localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, INITIAL_VALUE)
    );

    const [value, ] = result.current;

    expect(value).toBe(INITIAL_VALUE);

    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(INITIAL_VALUE));
  });

  test("should load existing value from localStorage", () => {
    const EXISTING_VALUE = "existing-data-from-store";

    localStorage.setItem(TEST_KEY, JSON.stringify(EXISTING_VALUE));

    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, INITIAL_VALUE)
    );

    expect(result.current[0]).toBe(EXISTING_VALUE);
  });

  test("should update state and localStorage when setValue is called", () => {
    const NEW_VALUE = "new-updated-data";

    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, INITIAL_VALUE)
    );

    const [, setValue] = result.current;

    act(() => {
      setValue(NEW_VALUE);
    });

    expect(result.current[0]).toBe(NEW_VALUE);

    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(NEW_VALUE));
  });

  test("should return initial value if JSON.parse fails", () => {
    localStorage.setItem(TEST_KEY, "}{invalid-json");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() =>
      useLocalStorage(TEST_KEY, INITIAL_VALUE)
    );

    expect(result.current[0]).toBe(INITIAL_VALUE);

    consoleErrorSpy.mockRestore();
  });
});
