
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendUserMessage, isLoading } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await sendUserMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSendMessage}
      className="p-4 border-t border-border bg-background/80 backdrop-blur-sm"
    >
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask the Ghibli Spirit anything..."
          disabled={isLoading}
          className="ghibli-input pr-12"
        />
        <Button 
          type="submit"
          size="icon"
          disabled={isLoading || !message.trim()}
          className="absolute right-1 ghibli-button w-10 h-10"
          aria-label="Send message"
        >
          <Send size={18} />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
