import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TransactionStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  currency: string;
  recipientName: string;
}

const TransactionStatusModal: React.FC<TransactionStatusModalProps> = ({
  isOpen,
  onClose,
  amount,
  currency,
  recipientName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate transaction processing time
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 3000); // 3 seconds loading time

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsLoading(true);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md"
        >
          <Card className="bg-background border-border/50 shadow-2xl">
            <CardContent className="p-8 text-center">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-6"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="mx-auto w-16 h-16"
                    >
                      <Loader2 className="w-16 h-16 text-primary" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Processing Transaction
                      </h3>
                      <p className="text-muted-foreground">
                        Please wait while we process your transfer...
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Sending {currency} {amount}</p>
                      <p>To: {recipientName}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.2 }}
                      className="mx-auto w-16 h-16"
                    >
                      <CheckCircle className="w-16 h-16 text-success" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Transaction Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your money has been sent successfully
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Amount: {currency} {amount}</p>
                      <p>Recipient: {recipientName}</p>
                      <p className="text-success font-medium">
                        Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </p>
                    </div>

                    <Button 
                      onClick={handleClose}
                      className="w-full bg-success hover:bg-success/90 text-white"
                    >
                      Done
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionStatusModal;
