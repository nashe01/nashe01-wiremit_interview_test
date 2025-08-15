import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Badge } from '@/components/ui/badge';

const ThemeStatus: React.FC = () => {
  const { theme } = useTheme();

  const getThemeColor = () => {
    return theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-500';
  };

  const getThemeText = () => {
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">Theme:</span>
      <Badge 
        variant="secondary" 
        className={`${getThemeColor()} text-white text-xs px-2 py-1`}
      >
        {getThemeText()}
      </Badge>
    </div>
  );
};

export default ThemeStatus;
