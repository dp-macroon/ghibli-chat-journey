
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat, ChatMessage } from '@/types';
import { saveChat, getAllChats, getChat, deleteChat, addMessageToChat } from '@/lib/db';
import { sendMessage } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface ChatContextProps {
  chats: Chat[];
  currentChat: Chat | null;
  activeTheme: string;
  isLoading: boolean;
  createNewChat: () => void;
  selectChat: (id: string) => void;
  deleteCurrentChat: () => void;
  sendUserMessage: (content: string) => Promise<void>;
  setActiveTheme: (theme: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>('totoro');
  const { toast } = useToast();

  useEffect(() => {
    const loadChats = async () => {
      try {
        const savedChats = await getAllChats();
        setChats(savedChats);
        
        // If there are no chats, create a new one
        if (savedChats.length === 0) {
          createNewChat();
        } else {
          setCurrentChat(savedChats[0]);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
        toast({
          title: "Error",
          description: "Failed to load chat history",
          variant: "destructive"
        });
      }
    };
    
    loadChats();
  }, []);

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      messages: []
    };
    
    saveChat(newChat)
      .then(() => {
        setChats(prev => [newChat, ...prev]);
        setCurrentChat(newChat);
      })
      .catch(error => {
        console.error("Failed to create new chat:", error);
        toast({
          title: "Error",
          description: "Failed to create new chat",
          variant: "destructive"
        });
      });
  };

  const selectChat = async (id: string) => {
    try {
      const chat = await getChat(id);
      if (chat) {
        setCurrentChat(chat);
      }
    } catch (error) {
      console.error("Failed to select chat:", error);
      toast({
        title: "Error",
        description: "Failed to load selected chat",
        variant: "destructive"
      });
    }
  };

  const deleteCurrentChat = async () => {
    if (!currentChat) return;
    
    try {
      await deleteChat(currentChat.id);
      setChats(prev => prev.filter(chat => chat.id !== currentChat.id));
      
      if (chats.length > 1) {
        // Select another chat if available
        const nextChat = chats.find(chat => chat.id !== currentChat.id);
        if (nextChat) {
          setCurrentChat(nextChat);
        }
      } else {
        // Create a new chat if this was the last one
        createNewChat();
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      toast({
        title: "Error",
        description: "Failed to delete chat",
        variant: "destructive"
      });
    }
  };

  const updateChatTitle = async (chat: Chat, userMessage: string) => {
    if (chat.title !== 'New Chat' || chat.messages.length > 0) {
      return;
    }
    
    // Create a title from the first message
    const newTitle = userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : '');
    const updatedChat = { ...chat, title: newTitle };
    
    try {
      await saveChat(updatedChat);
      setCurrentChat(updatedChat);
      setChats(prev => prev.map(c => c.id === chat.id ? updatedChat : c));
    } catch (error) {
      console.error("Failed to update chat title:", error);
    }
  };

  const sendUserMessage = async (content: string) => {
    if (!content.trim() || !currentChat) return;
    
    try {
      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content,
        timestamp: new Date().toISOString()
      };
      
      // Update the current chat with the user message
      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage]
      };
      
      setCurrentChat(updatedChat);
      await addMessageToChat(currentChat.id, userMessage);
      
      // Update the title if this is the first message
      await updateChatTitle(currentChat, content);
      
      // Now get the AI response
      setIsLoading(true);
      
      try {
        const response = await sendMessage([...currentChat.messages, userMessage]);
        
        const assistantMessage: ChatMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString()
        };
        
        const chatWithResponse = {
          ...updatedChat,
          messages: [...updatedChat.messages, assistantMessage]
        };
        
        setCurrentChat(chatWithResponse);
        await addMessageToChat(currentChat.id, assistantMessage);
        
        // Update the chats list
        setChats(prev => 
          prev.map(chat => chat.id === currentChat.id ? chatWithResponse : chat)
        );
      } catch (error) {
        console.error("Error getting AI response:", error);
        toast({
          title: "Error",
          description: "Failed to get response from AI",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        activeTheme,
        isLoading,
        createNewChat,
        selectChat,
        deleteCurrentChat,
        sendUserMessage,
        setActiveTheme
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
