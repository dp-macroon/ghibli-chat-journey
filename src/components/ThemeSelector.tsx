
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Paintbrush } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

const themes = [
  { id: 'totoro', name: 'Totoro', icon: '🌳', color: '#8ecdf9' },
  { id: 'spirited', name: 'Spirited Away', icon: '👺', color: '#f28fad' },
  { id: 'howl', name: 'Howl\'s Castle', icon: '🏰', color: '#ffad69' },
  { id: 'kiki', name: 'Kiki\'s Delivery', icon: '🧹', color: '#cdb4db' },
  { id: 'ponyo', name: 'Ponyo', icon: '🐟', color: '#a8dadc' },
  // Add new themes with different colors
  { id: 'yellow', name: 'Sunshine', icon: '☀️', color: '#FEF7CD' },
  { id: 'purple', name: 'Lavender', icon: '💜', color: '#9b87f5' },
  { id: 'green', name: 'Forest', icon: '🌿', color: '#94d2bd' },
  { id: 'orange', name: 'Sunset', icon: '🌇', color: '#F97316' },
  { id: 'blue', name: 'Ocean', icon: '🌊', color: '#0EA5E9' },
];

const ThemeSelector: React.FC = () => {
  const { activeTheme, setActiveTheme } = useChat();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9"
          style={{
            backgroundColor: themes.find(theme => theme.id === activeTheme)?.color || '#8ecdf9',
            borderColor: 'transparent'
          }}
        >
          <Paintbrush className="h-4 w-4 text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <div className="grid grid-cols-2 gap-1 p-1">
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`flex items-center gap-2 rounded-md p-2 justify-center ${activeTheme === theme.id ? "bg-accent/50" : ""}`}
              style={{ backgroundColor: activeTheme === theme.id ? `${theme.color}30` : undefined }}
            >
              <span>{theme.icon}</span>
              <span className="text-xs font-medium">{theme.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
