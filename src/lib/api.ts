
// This is a simple mock API for sending messages to the AI
// In a real application, this would connect to your backend

import { ChatMessage } from '@/types';
import { toast } from 'sonner';

// Mock delay to simulate API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock response generation based on temperature
const generateResponse = (messages: ChatMessage[], temperature: number): string => {
  const lastMessage = messages[messages.length - 1];
  
  if (!lastMessage || lastMessage.role !== 'user') {
    return "I'm sorry, I couldn't understand your message.";
  }
  
  // Simple response logic based on temperature
  if (temperature < 0.3) {
    return `I've analyzed your message: "${lastMessage.content}". Based on my understanding, I can provide you with a precise and factual response.`;
  } else if (temperature < 0.7) {
    return `Thank you for your message: "${lastMessage.content}". I'm happy to help you with that!`;
  } else {
    return `Oh, that's an interesting thought: "${lastMessage.content}"! That makes me wonder about all the creative possibilities we could explore together!`;
  }
};

export const sendMessage = async (messages: ChatMessage[], temperature: number = 0.5): Promise<string> => {
  try {
    // Simulate API call delay
    await delay(1000);
    
    // In a real app, this would be an API call to your backend
    return generateResponse(messages, temperature);
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error("Failed to send message");
    throw error;
  }
};
