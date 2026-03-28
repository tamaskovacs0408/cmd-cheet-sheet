import { memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/Badge/Badge";
import type { Category } from "@/data/types";
import "./category-card.scss";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = memo(function CategoryCard({
  category,
}: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (category.available) {
      void navigate(`/commands/${category.slug}`);
    }
  }, [category.slug, category.available, navigate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && category.available) {
        e.preventDefault();
        void navigate(`/commands/${category.slug}`);
      }
    },
    [category.slug, category.available, navigate]
  );

  return (
    <div
      className={`category-card ${!category.available ? "category-card--disabled" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={category.available ? 0 : -1}
      aria-disabled={!category.available}
      aria-label={`${category.label}${!category.available ? " — coming soon" : ""}`}
    >
      <div className='category-card__icon'>
        <CategoryIcon name={category.icon} />
      </div>
      <h2 className='category-card__label'>{category.label}</h2>
      {!category.available && (
        <Badge text='Coming Soon' variant='coming-soon' />
      )}
    </div>
  );
});

function CategoryIcon({ name }: { name: string }) {
  switch (name) {
    case "git":
      return (
        <svg
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='18' cy='18' r='3' />
          <circle cx='6' cy='6' r='3' />
          <path d='M13 6h3a2 2 0 0 1 2 2v7' />
          <line x1='6' y1='9' x2='6' y2='21' />
        </svg>
      );
    case "bash":
      return (
        <svg
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='4 17 10 11 4 5' />
          <line x1='12' y1='19' x2='20' y2='19' />
        </svg>
      );
    case "linux":
      return (
        <svg
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='4' y='4' width='16' height='16' rx='2' />
          <line x1='8' y1='12' x2='16' y2='12' />
          <line x1='8' y1='8' x2='16' y2='8' />
          <line x1='8' y1='16' x2='12' y2='16' />
        </svg>
      );
    case "powershell":
      return (
        <svg
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='5 7 12 14 5 21' />
          <line x1='13' y1='21' x2='19' y2='21' />
        </svg>
      );
    case "docker":
      return (
        <svg
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M22 12s-3-3-8-3-8 3-8 3' />
          <rect x='2' y='12' width='20' height='8' rx='2' />
          <line x1='7' y1='8' x2='7' y2='12' />
          <line x1='12' y1='6' x2='12' y2='12' />
          <line x1='17' y1='8' x2='17' y2='12' />
        </svg>
      );
    case "curl":
      return (
        <svg
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
          <polyline points='15 3 21 3 21 9' />
          <line x1='10' y1='14' x2='21' y2='3' />
        </svg>
      );
    default:
  }
}
