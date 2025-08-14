import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import adsData from '@/data/ads.json';

interface Ad {
  id: number;
  image: string;
  text: string;
  subtitle: string;
}

const AdsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ads] = useState<Ad[]>(adsData);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isPaused, ads.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (ads.length === 0) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden scroll-smooth">
      <CardContent className="p-0 scroll-smooth">
        <div
          className="relative h-64 bg-gradient-card scroll-smooth"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={ads[currentIndex].image}
                alt={ads[currentIndex].text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {ads[currentIndex].text}
                </h3>
                <p className="text-sm text-white/80">
                  {ads[currentIndex].subtitle}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {ads.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                onClick={goToNext}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Dot indicators */}
          {ads.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute top-4 right-4 text-white text-xs bg-black/40 px-2 py-1 rounded">
              Paused
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdsCarousel;