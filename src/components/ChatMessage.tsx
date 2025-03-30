
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType } from '@/types';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "bg-transparent" : "bg-secondary/20"
    )}>
      <Avatar className={cn(
        "h-8 w-8 rounded-md",
        isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
      )}>
        <div className="flex h-full w-full items-center justify-center">
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="font-medium">
          {isUser ? "You" : "Ghibli Spirit"}
        </div>
        
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
