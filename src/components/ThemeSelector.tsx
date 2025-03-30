
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Paintbrush } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

const themes = [
  { id: 'totoro', name: 'Totoro', icon: '🌳' },
  { id: 'spirited', name: 'Spirited Away', icon: '👺' },
  { id: 'howl', name: 'Howl\'s Castle', icon: '🏰' },
  { id: 'kiki', name: 'Kiki\'s Delivery', icon: '🧹' },
  { id: 'ponyo', name: 'Ponyo', icon: '🐟' },
];

const ThemeSelector: React.FC = () => {
  const { activeTheme, setActiveTheme } = useChat();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setActiveTheme(theme.id)}
            className={activeTheme === theme.id ? "bg-accent/50" : ""}
          >
            <span className="mr-2">{theme.icon}</span>
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
