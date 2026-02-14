import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import adsData from '@/data/ads.json';
import card1 from '@/assets/card1.jpg';
import card2 from '@/assets/card2.jpg';
import card3 from '@/assets/card3.png';

interface Ad {
  id: number;
  image: string;
  text: string;
  subtitle: string;
}

type AdsCarouselProps = {
  variant?: 'banner' | 'sidebar';
};

const AdsCarousel: React.FC<AdsCarouselProps> = ({ variant = 'sidebar' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardImages = [card1, card2, card3];
  const adsFromCards: Ad[] = adsData.map((ad, index) => ({
    ...ad,
    image: cardImages[index % cardImages.length]
  }));
  const [ads] = useState<Ad[]>(adsFromCards);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 6000);

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

  const isBanner = variant === 'banner';
  const heightClass = isBanner ? 'h-64 lg:h-80' : 'h-64';
  const titleClass = isBanner ? 'text-2xl lg:text-3xl font-semibold mb-2' : 'text-lg font-semibold mb-2';
  const subtitleClass = isBanner ? 'text-base lg:text-lg text-white/85' : 'text-sm text-white/80';
  const imageClass = isBanner ? 'w-full h-full object-contain p-2 sm:p-3' : 'w-full h-full object-contain p-1 sm:p-2';

  return (
    <Card className={`w-full overflow-hidden scroll-smooth ${isBanner ? 'ring-1 ring-black/5 dark:ring-white/10' : ''}`}>
      <CardContent className="p-0 scroll-smooth">
        <div
          className={`relative ${heightClass} bg-gradient-card scroll-smooth`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={currentIndex}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeOut' } }}
              transition={{ duration: 0 }}
              className="absolute inset-0"
            >
              <img
                src={ads[currentIndex].image}
                alt={ads[currentIndex].text}
                className={imageClass}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Side fade overlays */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-24 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-24 bg-gradient-to-l from-black/40 via-black/20 to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
              >
                <h3 className={titleClass}>
                  {ads[currentIndex].text}
                </h3>
                <p className={subtitleClass}>
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