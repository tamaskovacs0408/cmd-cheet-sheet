import { memo, useCallback, useRef, useEffect } from "react";
import "./search-bar.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export const SearchBar = memo(function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className='search-bar' role='search'>
      <div className='search-bar__input-wrapper'>
        <svg
          className='search-bar__icon'
          viewBox='0 0 24 24'
          width='18'
          height='18'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='11' cy='11' r='8' />
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </svg>
        <input
          ref={inputRef}
          className='search-bar__input'
          type='text'
          placeholder='Search commands... (press "/" to focus)'
          value={value}
          onChange={handleChange}
          aria-label='Search commands'
        />
        {value && (
          <button
            className='search-bar__clear'
            onClick={handleClear}
            aria-label='Clear search'
            type='button'
          >
            <svg
              viewBox='0 0 24 24'
              width='16'
              height='16'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        )}
        <kbd className='search-bar__shortcut'>/</kbd>
      </div>
      <div className='search-bar__results' aria-live='polite'>
        {value
          ? `Showing ${resultCount} of ${totalCount} commands`
          : `${totalCount} commands`}
      </div>
    </div>
  );
});
