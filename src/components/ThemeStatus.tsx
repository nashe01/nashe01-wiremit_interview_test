import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Badge } from '@/components/ui/badge';

const ThemeStatus: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();

  const getThemeColor = () => {
    if (theme === 'system') return 'bg-blue-500';
    if (theme === 'dark') return 'bg-gray-700';
    return 'bg-yellow-500';
  };

  const getThemeText = () => {
    if (theme === 'system') return 'System';
    if (theme === 'dark') return 'Dark';
    return 'Light';
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">Theme:</span>
      <Badge 
        variant="secondary" 
        className={`${getThemeColor()} text-white text-xs px-2 py-1`}
      >
        {getThemeText()}
        {theme === 'system' && (
          <span className="ml-1 text-xs opacity-75">
            ({resolvedTheme})
          </span>
        )}
      </Badge>
    </div>
  );
};

export default ThemeStatus;
