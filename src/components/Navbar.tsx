import React from 'react';
import { motion } from 'framer-motion';
import { Send, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">WireMit</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#support" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
            <Button variant="outline" className="hidden sm:flex">
              Sign In
            </Button>
            <Button onClick={onGetStarted} className="btn-hero">
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;