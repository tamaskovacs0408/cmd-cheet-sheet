import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("does not update the value before the delay", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 300 } }
    );

    rerender({ value: "world", delay: 300 });
    vi.advanceTimersByTime(200);

    expect(result.current).toBe("hello");
    vi.useRealTimers();
  });

  it("updates the value after the delay", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 300 } }
    );

    rerender({ value: "world", delay: 300 });
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe("world");
    vi.useRealTimers();
  });

  it("resets the timer when value changes rapidly", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } }
    );

    rerender({ value: "ab", delay: 300 });
    vi.advanceTimersByTime(150);

    rerender({ value: "abc", delay: 300 });
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe("abc");
    vi.useRealTimers();
  });
});
