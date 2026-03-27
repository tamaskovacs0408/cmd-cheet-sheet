import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { useTheme } from "./useTheme";
import type { ReactNode } from "react";

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws when used outside ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");
  });

  it("returns theme and toggleTheme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBeDefined();
    expect(typeof result.current.toggleTheme).toBe("function");
  });

  it("toggles theme from light to dark", () => {
    localStorage.setItem("theme", "light");
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("light");

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe("dark");
  });

  it("toggles theme from dark to light", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe("light");
  });

  it("persists theme to localStorage", () => {
    localStorage.setItem("theme", "light");
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => result.current.toggleTheme());

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("applies theme class to document element", () => {
    localStorage.setItem("theme", "light");
    renderHook(() => useTheme(), { wrapper });

    expect(document.documentElement.classList.contains("theme--light")).toBe(
      true
    );
  });
});
