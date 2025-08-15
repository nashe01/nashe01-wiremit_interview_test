import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import OnboardingModal from '@/components/OnboardingModal';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import card1 from '@/assets/card1.jpg';
import card2 from '@/assets/card2.jpg';
import card3 from '@/assets/card3.jpg';

const LandingPage: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingSuccess = () => {
    setShowOnboarding(false);
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Send money in seconds, not days'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your money and data are always protected'
    },
    {
      icon: Star,
      title: 'Low Fees',
      description: 'Transparent pricing with no hidden costs'
    }
  ];

  const cardImages = [card1, card2, card3];

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-20 scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 scroll-smooth"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  One app, all things{' '}
                  <span className="gradient-text">money</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg sm:text-xl text-muted-foreground max-w-lg"
                >
                  From easy money management, to travel perks and investments. 
                  Open your account in a flash.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button onClick={handleGetStarted} className="btn-hero group">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Rotating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] flex items-center justify-center"
            >
              {cardImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0,
                    rotateY: index * 30,
                    rotateX: 10,
                    z: -index * 50
                  }}
                  animate={{ 
                    opacity: 1,
                    rotateY: index * 30,
                    rotateX: 10,
                    z: -index * 50
                  }}
                  transition={{ 
                    delay: 0.2 * index,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="absolute w-80 h-60 rounded-2xl overflow-hidden shadow-elegant card-elevated hover:scale-105 transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${index * 15}deg) rotateX(10deg) translateZ(${-index * 30}px)`
                  }}
                >
                  <img
                    src={image}
                    alt={`Feature card ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onSuccess={handleOnboardingSuccess}
      />
    </div>
  );
};

export default LandingPage;