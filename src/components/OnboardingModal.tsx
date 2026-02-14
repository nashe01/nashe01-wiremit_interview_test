import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
      <DialogContent className="sm:max-w-md p-0 bg-gradient-card border-0 shadow-elegant scroll-smooth">
        <div className="relative scroll-smooth">
          <div className="p-6 scroll-smooth">
            <AnimatePresence mode="wait">
              {currentView === 'signin' ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="scroll-smooth"
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
                  className="scroll-smooth"
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