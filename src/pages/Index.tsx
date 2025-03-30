
import React from 'react';
import Layout from '@/components/Layout';
import { ChatProvider } from '@/contexts/ChatContext';
import Head from '@/components/Head';

const Index = () => {
  return (
    <>
      <Head 
        title="Ghibli Chat - A Magical AI Experience"
        description="Chat with the spirit of Studio Ghibli in this magical AI experience"
      />
      <ChatProvider>
        <Layout />
      </ChatProvider>
    </>
  );
};

export default Index;
