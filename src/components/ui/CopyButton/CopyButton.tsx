import { memo, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import "./copy-button.scss";

interface CopyButtonProps {
  text: string;
}

export const CopyButton = memo(function CopyButton({ text }: CopyButtonProps) {
  const { copy, copied } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    void copy(text);
  }, [copy, text]);

  return (
    <button
      className={`copy-button ${copied ? "copy-button--copied" : ""}`}
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : `Copy command to clipboard`}
      type='button'
    >
      {copied ? (
        <>
          <svg
            viewBox='0 0 24 24'
            width='14'
            height='14'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='20 6 9 17 4 12' />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg
            viewBox='0 0 24 24'
            width='14'
            height='14'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
            <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
});
