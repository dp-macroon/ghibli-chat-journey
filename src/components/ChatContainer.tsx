
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { useChat } from '@/contexts/ChatContext';
import { Loader2 } from 'lucide-react';

const ChatContainer: React.FC = () => {
  const { currentChat, isLoading } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [currentChat?.messages]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">Welcome to Ghibli Chat</h2>
          <p className="text-muted-foreground">Start a new chat to begin your adventure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-1 overflow-y-auto"
      >
        <div className="divide-y divide-border">
          {currentChat.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}
          
          {currentChat.messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-accent/30 flex items-center justify-center">
                <img 
                  src="/images/totoro.png" 
                  alt="Totoro" 
                  className="w-16 h-16 animate-float" 
                />
              </div>
              <h2 className="text-xl font-medium text-primary mb-2">How can I assist you today?</h2>
              <p className="text-muted-foreground max-w-md">
                Ask me anything about Studio Ghibli films, characters, or any other topic you'd like to explore!
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
