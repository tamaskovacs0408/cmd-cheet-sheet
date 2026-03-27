import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./useSearch";
import type { Command } from "@/data/types";

const mockCommands: Command[] = [
  {
    id: "git-status",
    syntax: "git status",
    label: "Check working tree status",
    description: "See which files have been modified or staged.",
    keywords: ["changes", "modified"],
    category: "git",
  },
  {
    id: "git-push",
    syntax: "git push origin main",
    label: "Push branch to remote",
    description: "Upload your commits to the remote repository.",
    keywords: ["upload", "remote"],
    category: "git",
  },
  {
    id: "git-stash",
    syntax: "git stash",
    label: "Stash uncommitted changes",
    description: "Temporarily store your uncommitted work.",
    keywords: ["save", "temporary", "wip"],
    category: "git",
  },
];

describe("useSearch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns all commands when query is empty", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, ""));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(3);
    expect(result.current.filteredCommands).toEqual(mockCommands);
    vi.useRealTimers();
  });

  it("returns all commands when query is whitespace", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, "   "));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(3);
    vi.useRealTimers();
  });

  it("filters by syntax match", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, "stash"));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(1);
    expect(result.current.filteredCommands[0]!.id).toBe("git-stash");
    vi.useRealTimers();
  });

  it("filters by description match", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, "upload"));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(1);
    expect(result.current.filteredCommands[0]!.id).toBe("git-push");
    vi.useRealTimers();
  });

  it("filters by keyword match", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, "wip"));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(1);
    expect(result.current.filteredCommands[0]!.id).toBe("git-stash");
    vi.useRealTimers();
  });

  it("filters by label match", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() =>
      useSearch(mockCommands, "working tree")
    );
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(1);
    expect(result.current.filteredCommands[0]!.id).toBe("git-status");
    vi.useRealTimers();
  });

  it("is case insensitive", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, "PUSH"));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(1);
    expect(result.current.filteredCommands[0]!.id).toBe("git-push");
    vi.useRealTimers();
  });

  it("supports multi-term search (AND logic)", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, "git remote"));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(1);
    expect(result.current.filteredCommands[0]!.id).toBe("git-push");
    vi.useRealTimers();
  });

  it("returns empty array when no match", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSearch(mockCommands, "nonexistent"));
    act(() => vi.advanceTimersByTime(300));

    expect(result.current.filteredCommands).toHaveLength(0);
    vi.useRealTimers();
  });
});
