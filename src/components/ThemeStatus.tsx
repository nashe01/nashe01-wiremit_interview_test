import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Badge } from '@/components/ui/badge';

const ThemeStatus: React.FC = () => {
  const { theme } = useTheme();

  

  const getThemeText = () => {
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">Theme:</span>
      <Badge 
        variant="secondary" 
        
      >
        {getThemeText()}
      </Badge>
    </div>
  );
};

export default ThemeStatus;
