import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCopyToClipboard } from "./useCopyToClipboard";

describe("useCopyToClipboard", () => {
  const writeTextMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });
    writeTextMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("starts with copied as false and no error", () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("calls navigator.clipboard.writeText with the provided text", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("git status");
    });

    expect(writeTextMock).toHaveBeenCalledWith("git status");
  });

  it("sets copied to true after successful copy", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("git status");
    });

    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("resets copied to false after the reset delay", async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));

    await act(async () => {
      await result.current.copy("git push");
    });
    expect(result.current.copied).toBe(true);

    act(() => vi.advanceTimersByTime(1000));

    expect(result.current.copied).toBe(false);
  });

  it("sets error when clipboard write fails", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("Permission denied"));

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("git push");
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error!.message).toBe("Permission denied");
  });
});
