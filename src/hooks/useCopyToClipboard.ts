import { useState, useCallback, useEffect, useRef } from "react";

interface UseCopyToClipboardReturn {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: Error | null;
}

export function useCopyToClipboard(
  resetDelay = 2000
): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Copy failed"));
      setCopied(false);
    }
  }, []);

  useEffect(() => {
    if (copied) {
      timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [copied, resetDelay]);

  return { copy, copied, error };
}
