
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from '@/context/AlertContext';
import { MapPin } from 'lucide-react';

interface AlertMapProps {
  alert: Alert;
  className?: string;
}

const AlertMap: React.FC<AlertMapProps> = ({ alert, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // For demo purposes, we'll just display a placeholder map
  // In a real implementation, this would integrate with a maps API
  useEffect(() => {
    if (mapRef.current) {
      // Simulate map loading
      const timer = setTimeout(() => {
        setMapLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className || ''}`}>
      <div 
        ref={mapRef} 
        className="bg-gradient-to-br from-blue-100 to-blue-200 h-64 w-full"
      >
        {!mapLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
        
        {mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFY0YzcuNzMyIDAgMTQgNi4yNjggMTQgMTRoNHptMTIgMThjMCA5Ljk0LTguMDYgMTgtMTggMTh2LTRjNy43MzIgMCAxNC02LjI2OCAxNC0xNGg0ek0xMi4yNTQgNTQuNDZDNS40MTQgNTEuNTUxIDAgNDQuNTMgMCAzNmg0YzAgNi45NzYgNC40MzUgMTIuOTI3IDEwLjY1NCAxNS4xNGwuNiAzLjMyek00Ny43NDYgNS41NEw0Ny40IDIuMkM1My41NjUgNS4wNzMgNTggMTIuMDk0IDU4IDIwaDQgMS42LjhDNjAgMTEuNDcgNTQuNTg2IDQuNDkgNDcuNzQ2IDUuNTQuMDAyeiIgZmlsbD0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik01MCAxOGMwLTcuNzMyLTYuMjY4LTE0LTE0LTE0di00YzkuOTQgMCAxOCA4LjA2IDE4IDE4aDR6TTE4IDUwYzcuNzMyIDAgMTQtNi4yNjggMTQtMTRoNGMwIDkuOTQtOC4wNiAxOC0xOCAxOHY0ek00LjY3NyA0NC4xNTNMMy4wOCA0Ny4yNkMyLjM4NiA0My44MDIgMCA0MC4wOTggMCAzNmg0Yy01LjU4NSAyLjk4IC4wMDQgNS4yNyA2Ljc3MyA4LjE1M3pNNTYuOTIgMTIuNzRsLjgtLjhDNTQuMTM4IDQuNDM0IDQ3LjQ3MiAwIDQwIDB2NGM0Ljg2NSAwIDkuNjM4IDIuMzg1IDEyLjcyIDYuOTJsNC40LTRjLS4wMDIuODguMDIgMS44NC4wMDIuODJ6IiBmaWxsPSIjY2NjY2NjIi8+PC9nPjwvc3ZnPg==')]">
            </div>
            
            <div className="absolute">
              <div className="animate-bounce">
                <div className="relative">
                  <div className="absolute -inset-1 bg-secondary rounded-full opacity-50 blur"></div>
                  <MapPin size={32} className="text-primary fill-primary/30 relative z-10" />
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm text-xs text-center px-2 py-1 rounded-md mt-1">
                {alert.riderName}'s location
              </div>
            </div>
            
            {/* Hospital markers */}
            <div className="absolute top-1/4 left-1/4">
              <div className="bg-blue-500 p-1 rounded-full">
                <span className="text-white text-xs">H</span>
              </div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/3">
              <div className="bg-red-500 p-1 rounded-full">
                <span className="text-white text-xs">P</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
        Lat: {alert.location.latitude.toFixed(4)}, Lng: {alert.location.longitude.toFixed(4)}
      </div>
      
      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
        <span>H = Hospital</span>
        <span className="mx-2">|</span>
        <span>P = Police</span>
      </div>
    </div>
  );
};

export default AlertMap;
