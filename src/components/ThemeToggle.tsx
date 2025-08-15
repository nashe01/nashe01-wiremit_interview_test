import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-4 h-4" />;
    }
    return theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />;
  };

  const getNextTheme = () => {
    if (theme === 'light') return 'dark';
    if (theme === 'dark') return 'system';
    return 'light';
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0 rounded-full border-border/50 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
      aria-label={`Switch to ${getNextTheme()} mode`}
      title={`Current: ${theme} (${resolvedTheme}) - Click for ${getNextTheme()}`}
    >
      {getIcon()}
    </Button>
  );
};

export default ThemeToggle;
