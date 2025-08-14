import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [currentView, setCurrentView] = useState<'signin' | 'signup'>('signin');

  const switchToSignUp = () => setCurrentView('signup');
  const switchToSignIn = () => setCurrentView('signin');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-gradient-card border-0 shadow-elegant">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="p-6">
            <AnimatePresence mode="wait">
              {currentView === 'signin' ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SignInForm 
                    onSuccess={onSuccess}
                    onSwitchToSignUp={switchToSignUp}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SignUpForm 
                    onSuccess={onSuccess}
                    onSwitchToSignIn={switchToSignIn}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;