
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import ChatList from '@/components/ChatList';
import ChatContainer from '@/components/ChatContainer';
import ThemeSelector from '@/components/ThemeSelector';
import DarkModeToggle from '@/components/DarkModeToggle';
import ChatHistoryToggle from '@/components/ChatHistoryToggle';
import UserProfile from '@/components/UserProfile';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen overflow-hidden bg-background/50 backdrop-blur-sm">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:flex md:flex-col w-64 h-full border-r border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="font-bold text-lg">QuantAlex Chat</h1>
            <div className="flex space-x-2">
              <DarkModeToggle />
              <ThemeSelector />
            </div>
          </div>
          <Separator />
          <UserProfile />
          <Separator />
          <div className="flex-1 overflow-auto">
            <ChatList />
          </div>
        </div>
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden absolute top-4 left-4 z-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex items-center justify-between p-4">
              <h1 className="font-bold text-lg">QuantAlex Chat</h1>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Separator />
            <UserProfile />
            <Separator />
            <div className="flex-1 overflow-auto">
              <ChatList />
            </div>
          </SheetContent>
        </Sheet>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-center p-4 border-b border-border relative">
            <h1 className="font-bold text-lg">QuantAlex Chat</h1>
            <div className="absolute right-4 flex space-x-2">
              <ChatHistoryToggle />
              <DarkModeToggle />
              <ThemeSelector />
            </div>
          </div>
        )}
        
        {/* Desktop Header */}
        {!isMobile && (
          <div className="flex items-center justify-end p-4 border-b border-border">
            <ChatHistoryToggle />
          </div>
        )}
        
        <ChatContainer />
      </div>
    </div>
  );
};

export default Layout;
