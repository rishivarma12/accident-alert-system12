
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export type Friend = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export type Alert = {
  id: string;
  riderId: string;
  riderName: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  timestamp: Date;
  status: 'active' | 'resolved';
};

interface AlertContextType {
  friends: Friend[];
  alerts: Alert[];
  addFriend: (friend: Omit<Friend, 'id'>) => void;
  removeFriend: (id: string) => void;
  triggerAlert: (riderId: string, riderName: string) => void;
  resolveAlert: (alertId: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '555-1234' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '555-5678' }
  ]);
  
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { toast } = useToast();

  const addFriend = (friend: Omit<Friend, 'id'>) => {
    const newFriend: Friend = {
      ...friend,
      id: Math.random().toString(36).substring(2, 11)
    };
    
    setFriends([...friends, newFriend]);
    toast({
      title: "Friend added",
      description: `${friend.name} has been added to your emergency contacts`,
    });
  };

  const removeFriend = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
    toast({
      title: "Friend removed",
      description: "Contact has been removed from your emergency list",
    });
  };

  // Generate a random location near the user for demo purposes
  const getRandomNearbyLocation = () => {
    // Generate random coordinates (roughly within a few miles)
    const latitude = 37.7749 + (Math.random() - 0.5) * 0.05;
    const longitude = -122.4194 + (Math.random() - 0.5) * 0.05;
    
    return { latitude, longitude };
  };

  const triggerAlert = (riderId: string, riderName: string) => {
    const location = getRandomNearbyLocation();
    
    const newAlert: Alert = {
      id: Math.random().toString(36).substring(2, 11),
      riderId,
      riderName,
      location,
      timestamp: new Date(),
      status: 'active'
    };
    
    setAlerts([...alerts, newAlert]);
    
    toast({
      title: "Emergency Alert Triggered",
      description: `Alert has been sent to all emergency contacts`,
      variant: "destructive",
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' } 
        : alert
    ));
    
    toast({
      title: "Alert resolved",
      description: "The emergency alert has been resolved",
    });
  };

  return (
    <AlertContext.Provider value={{ 
      friends, 
      alerts, 
      addFriend, 
      removeFriend,
      triggerAlert,
      resolveAlert
    }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
