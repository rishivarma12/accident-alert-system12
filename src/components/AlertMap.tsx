
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from '@/context/AlertContext';
import { MapPin, Volume2, VolumeX } from 'lucide-react';

interface AlertMapProps {
  alert: Alert;
  className?: string;
}

const AlertMap: React.FC<AlertMapProps> = ({ alert, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isBuzzerActive, setIsBuzzerActive] = useState(alert.status === 'active');

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

  // Control the buzzer sound effect
  useEffect(() => {
    if (audioRef.current) {
      if (alert.status === 'active' && isBuzzerActive) {
        audioRef.current.play().catch(error => {
          console.error("Error playing buzzer sound:", error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [alert.status, isBuzzerActive]);

  const toggleBuzzer = () => {
    setIsBuzzerActive(!isBuzzerActive);
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${className || ''}`}>
      {/* Audio element for buzzer sound */}
      <audio 
        ref={audioRef} 
        src="data:audio/wav;base64,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"
        loop
      ></audio>
      
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
              <div className={`${alert.status === 'active' && isBuzzerActive ? 'animate-bounce' : ''}`}>
                <div className="relative">
                  <div className={`absolute -inset-1 bg-secondary rounded-full ${alert.status === 'active' ? 'opacity-70 pulse' : 'opacity-50'} blur`}></div>
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
      
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <div className="bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
          <span>H = Hospital</span>
          <span className="mx-2">|</span>
          <span>P = Police</span>
        </div>
        
        {alert.status === 'active' && (
          <button
            onClick={toggleBuzzer}
            className={`p-1.5 rounded-full ${isBuzzerActive ? 'bg-destructive/90' : 'bg-background/80'} backdrop-blur-sm`}
            title={isBuzzerActive ? "Mute buzzer" : "Unmute buzzer"}
          >
            {isBuzzerActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertMap;
