
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get the first letter of the email as a fallback
  const getInitials = () => {
    const email = user.email || '';
    return email.charAt(0).toUpperCase();
  };

  // Get the username from user metadata or the email prefix
  const getDisplayName = () => {
    if (user.user_metadata?.username) {
      return user.user_metadata.username;
    }
    
    const email = user.email || '';
    return email.split('@')[0];
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{getDisplayName()}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserProfile;
