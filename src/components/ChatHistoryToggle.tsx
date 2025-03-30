
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CircleDot, History } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

const tempOptions = [
  { value: 0.2, label: 'Precise' },
  { value: 0.5, label: 'Balanced' },
  { value: 0.8, label: 'Creative' },
  { value: 1.0, label: 'Imaginative' },
];

const ChatHistoryToggle: React.FC = () => {
  const { temperature, setTemperature } = useChat();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 relative"
        >
          <History className="h-4 w-4" />
          <span className="sr-only">Chat settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Temperature</p>
          <p className="text-xs text-muted-foreground">
            Control how creative the responses are
          </p>
          <div className="mt-2 space-y-1">
            {tempOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setTemperature(option.value)}
              >
                <span>{option.label}</span>
                {Math.abs(temperature - option.value) < 0.1 && (
                  <CircleDot className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatHistoryToggle;
