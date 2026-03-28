import { useState, useMemo, useCallback } from "react";
import { useParams, Navigate, Link } from "react-router";
import { commandsByCategory, categories } from "@/data";
import { useSearch } from "@/hooks/useSearch";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { CommandCard } from "@/components/ui/CommandCard/CommandCard";
import type { CategorySlug } from "@/data/types";
import "./category-page.scss";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [query, setQuery] = useState("");

  const categoryData = useMemo(
    () => categories.find(c => c.slug === category),
    [category]
  );

  const commands = useMemo(
    () => commandsByCategory[category as CategorySlug] ?? [],
    [category]
  );

  const { filteredCommands } = useSearch(commands, query);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  if (!categoryData?.available) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='category-page'>
      <div className='category-page__header'>
        <Link to='/' className='category-page__back'>
          <svg
            viewBox='0 0 24 24'
            width='18'
            height='18'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='19' y1='12' x2='5' y2='12' />
            <polyline points='12 19 5 12 12 5' />
          </svg>
          <span>All Categories</span>
        </Link>
        <h1 className='category-page__title'>{categoryData.label} Commands</h1>
      </div>

      <SearchBar
        value={query}
        onChange={handleSearchChange}
        resultCount={filteredCommands.length}
        totalCount={commands.length}
      />

      {filteredCommands.length > 0 ? (
        <div className={`category-page__list ${category === "curl" || category === "docker" ? "category-page__list--single" : ""}`}>
          {filteredCommands.map(cmd => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      ) : (
        <div className='category-page__empty'>
          <svg
            viewBox='0 0 24 24'
            width='48'
            height='48'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='11' cy='11' r='8' />
            <line x1='21' y1='21' x2='16.65' y2='16.65' />
            <line x1='8' y1='11' x2='14' y2='11' />
          </svg>
          <p className='category-page__empty-text'>
            No commands match &ldquo;<strong>{query}</strong>&rdquo;
          </p>
          <p className='category-page__empty-hint'>
            Try different keywords or clear the search
          </p>
        </div>
      )}
    </div>
  );
}
