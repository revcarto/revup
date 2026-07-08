import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Gauge } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Overview' },
    { path: '/demo', label: 'Live Demo' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/15 border border-primary/30">
              <Gauge className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-foreground">RevUp™</span>
            <span className="hidden sm:inline text-xs text-muted-foreground">by RevCarto</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="mailto:jason@revcarto.com?subject=RevUp%E2%84%A2%20Walkthrough">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book a Walkthrough
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-accent/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:jason@revcarto.com?subject=RevUp%E2%84%A2%20Walkthrough"
              className="block px-4 py-2 rounded-md text-sm font-medium text-primary"
            >
              Book a Walkthrough
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
