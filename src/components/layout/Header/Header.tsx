import { Link } from "react-router";
import { ThemeToggle } from "@/components/ui/ThemeToggle/ThemeToggle";
import "./header.scss";

export function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__logo'>
          <svg
            className='header__logo-icon'
            viewBox='0 0 24 24'
            width='28'
            height='28'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='4 17 10 11 4 5' />
            <line x1='12' y1='19' x2='20' y2='19' />
          </svg>
          <span className='header__logo-text'>Command Cheat Sheet</span>
        </Link>
        <div className='header__actions'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
