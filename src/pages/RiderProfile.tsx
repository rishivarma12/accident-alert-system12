
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Phone } from 'lucide-react';

const RiderProfile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    emergencyContact: user?.emergencyContact || '',
    allowAlerts: user?.alertPermissions && user.alertPermissions.length > 0
  });
  
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        emergencyContact: user.emergencyContact || '',
        allowAlerts: user.alertPermissions && user.alertPermissions.length > 0
      });
    }
  }, [user]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Create a new alertPermissions array based on checkbox
    const alertPermissions = profile.allowAlerts ? 
      user?.alertPermissions || ['defaultfriend@example.com'] : 
      [];
    
    updateUserProfile({
      name: profile.name,
      emergencyContact: profile.emergencyContact,
      alertPermissions
    });
    
    toast({
      title: "Profile updated",
      description: "Your rider profile has been saved successfully"
    });
    
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Rider Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and emergency settings
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your rider details and emergency contact information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="pl-10"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Primary Emergency Contact Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="emergencyContact"
                    value={profile.emergencyContact}
                    onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                    className="pl-10"
                    placeholder="555-123-4567"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This number will be called first in case of emergency
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="allowAlerts" 
                  checked={profile.allowAlerts}
                  onCheckedChange={(checked) => 
                    setProfile({...profile, allowAlerts: checked === true})
                  }
                />
                <Label 
                  htmlFor="allowAlerts" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Allow alerts to be sent to my emergency contacts
                </Label>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Safety Information</CardTitle>
            <CardDescription>
              How the emergency alert system works
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium mb-2">How alerts work</h3>
              <p className="text-sm text-muted-foreground">
                When you trigger an emergency alert, your current location and status will be shared
                with all of your emergency contacts.
              </p>
            </div>
            
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium mb-2">Privacy controls</h3>
              <p className="text-sm text-muted-foreground">
                You can control who receives your emergency alerts by adding or removing contacts
                from your emergency contacts list.
              </p>
            </div>
            
            <div className="rounded-lg bg-secondary/20 p-4">
              <h3 className="font-medium mb-2">Emergency response</h3>
              <p className="text-sm text-muted-foreground">
                For immediate emergency services, always call your local emergency number (911, 112, 999) first.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiderProfile;
