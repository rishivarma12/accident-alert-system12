
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, User, UserPlus, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAlert, Friend, Alert } from '@/context/AlertContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AlertMap from '@/components/AlertMap';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { friends, alerts, addFriend, removeFriend, triggerAlert, resolveAlert } = useAlert();
  
  const [newFriend, setNewFriend] = useState<Omit<Friend, 'id'>>({
    name: '',
    email: '',
    phone: ''
  });
  
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  
  const handleAddFriend = () => {
    if (newFriend.name && newFriend.email) {
      addFriend(newFriend);
      setNewFriend({ name: '', email: '', phone: '' });
    }
  };
  
  const handleTriggerAlert = () => {
    if (user) {
      triggerAlert(user.id, user.name || 'Unknown rider');
      setShowEmergencyDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name || 'Rider'}
          </p>
        </div>
        
        {/* Emergency Alert Button */}
        <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="lg" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Emergency Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Confirm Emergency Alert</DialogTitle>
              <DialogDescription className="text-center pt-2">
                This will send your current location to all your emergency contacts.
                Only use this in case of a real emergency.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEmergencyDialog(false)}
                className="sm:flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="destructive"
                onClick={handleTriggerAlert}
                className="sm:flex-1"
              >
                Send Emergency Alert
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contacts">
            <User className="h-4 w-4 mr-2" />
            Emergency Contacts
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Bell className="h-4 w-4 mr-2" />
            Alerts {alerts.filter(a => a.status === 'active').length > 0 && `(${alerts.filter(a => a.status === 'active').length})`}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Add Emergency Contact</CardTitle>
              <CardDescription>
                Add friends or family members who should be notified in case of emergency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Contact name"
                    value={newFriend.name}
                    onChange={(e) => setNewFriend({...newFriend, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="contact@example.com"
                    value={newFriend.email}
                    onChange={(e) => setNewFriend({...newFriend, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input 
                    id="phone" 
                    placeholder="555-123-4567"
                    value={newFriend.phone || ''}
                    onChange={(e) => setNewFriend({...newFriend, phone: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAddFriend}
                disabled={!newFriend.name || !newFriend.email}
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Add Contact
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <Card key={friend.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex justify-between items-start">
                    <span>{friend.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-muted-foreground"
                      onClick={() => removeFriend(friend.id)}
                    >
                      &times;
                    </Button>
                  </CardTitle>
                  <CardDescription>{friend.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  {friend.phone && (
                    <p className="text-sm">Phone: {friend.phone}</p>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {friends.length === 0 && (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>No contacts yet</CardTitle>
                  <CardDescription>
                    Add emergency contacts who should be notified in case of an emergency.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4 mt-4">
          {alerts.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No alerts</CardTitle>
                <CardDescription>
                  Emergency alerts from you or your friends will appear here.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {alerts.map((alert) => (
                <Card key={alert.id} className={alert.status === 'active' ? 'border-destructive border-2' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {alert.status === 'active' && (
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                          </span>
                        )}
                        Alert from {alert.riderName}
                      </CardTitle>
                      
                      <div className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <CardDescription>
                      Status: <span className={alert.status === 'active' ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                        {alert.status === 'active' ? 'ACTIVE EMERGENCY' : 'Resolved'}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <AlertMap alert={alert} className="mt-2" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium">Rider Information</h4>
                        <p>Name: {alert.riderName}</p>
                        <p>Rider ID: {alert.riderId}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Location Information</h4>
                        <p>Latitude: {alert.location.latitude.toFixed(6)}</p>
                        <p>Longitude: {alert.location.longitude.toFixed(6)}</p>
                      </div>
                    </div>
                  </CardContent>
                  {alert.status === 'active' && (
                    <CardFooter>
                      <Button 
                        onClick={() => resolveAlert(alert.id)}
                        variant="outline"
                        className="w-full"
                      >
                        Mark as Resolved
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
