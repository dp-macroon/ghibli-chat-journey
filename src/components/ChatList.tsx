
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Chat } from '@/types';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

const ChatList: React.FC = () => {
  const { chats, currentChat, createNewChat, selectChat, deleteCurrentChat } = useChat();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Button 
          onClick={createNewChat} 
          className="w-full ghibli-button flex items-center gap-2"
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg flex items-center group hover:bg-accent/20 transition-colors",
                currentChat?.id === chat.id && "bg-accent/30 font-medium"
              )}
            >
              <div className="flex-1 flex items-center gap-3 truncate">
                <MessageSquare size={16} className="shrink-0" />
                <span className="truncate">{chat.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(chat.createdAt)}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
      
      {currentChat && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={deleteCurrentChat}
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete Chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatList;
