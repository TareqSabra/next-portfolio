import * as React from 'react';

export interface HeaderProps {
  currentPath?: string;
  links: Array<{ label: string; href: string }>;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '', links }) => {
  return (
    <header className="portfolio-header">
      <a href="/" className="portfolio-logo">
        Portfolio.
      </a>
      <nav className="portfolio-nav">
        {links.map((link) => {
          const isActive = currentPath === link.href || currentPath.startsWith(link.href + '/');
          return (
            <a
              key={link.href}
              href={link.href}
              className={`portfolio-nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
};
