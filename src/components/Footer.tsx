
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-6 mt-auto">
      <div className="container text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} RideSafeTogether. All rights reserved.</p>
        <p className="mt-1">Stay safe while riding</p>
      </div>
    </footer>
  );
};

export default Footer;
