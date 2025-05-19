
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, Home, User, LogOut, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <Home className="h-4 w-4 mr-1" /> },
    { label: 'Profile', path: '/profile', icon: <User className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="pulse-ring"></div>
            <Map className="h-8 w-8 text-primary relative z-10" />
          </div>
          <h1 className="text-xl font-bold text-primary">RideSafeTogether</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors",
                location.pathname === item.path 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="relative" 
          >
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-1" /> 
            Logout
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t py-2">
        <div className="container flex justify-around">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center text-xs py-1 px-3 rounded-md",
                location.pathname === item.path 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground"
              )}
            >
              {React.cloneElement(item.icon, { className: "h-5 w-5 mb-1" })}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
