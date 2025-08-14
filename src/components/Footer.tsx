import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            
          </div>
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} WireMit. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
            <span className="opacity-40">•</span>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms</a>
            <span className="opacity-40">•</span>
            <a href="#" className="hover:text-primary-foreground transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


