import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Edit, Send, MapPin, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRates } from '@/context/RatesContext';

interface ReviewTransactionProps {
  formData: {
    destinationCountry: string;
    amount: string;
    currency: string;
    deliveryMethod: string;
    recipientName: string;
    recipientDetails: string;
    paymentMethod: string;
  };
  selectedCountry?: {
    code: string;
    name: string;
    currency: string;
  };
  calculateFee: (amount: number, currency: string) => number;
  calculateReceivedAmount: (amount: number, currency: string, targetCurrency: string) => number;
  onConfirm: () => void;
  onEdit: () => void;
}

const ReviewTransaction: React.FC<ReviewTransactionProps> = ({
  formData,
  selectedCountry,
  calculateFee,
  calculateReceivedAmount,
  onConfirm,
  onEdit
}) => {
  const { getRate } = useRates();
  
  const amount = parseFloat(formData.amount);
  const fee = calculateFee(amount, formData.currency);
  const exchangeRate = selectedCountry ? getRate(selectedCountry.currency) : 1;
  const receivedAmount = selectedCountry ? calculateReceivedAmount(amount, formData.currency, selectedCountry.currency) : amount;

  const getDeliveryMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      'cash-pickup': 'Cash Pickup',
      'bank-deposit': 'Bank Deposit',
      'ecocash': 'EcoCash',
      'mpesa': 'M-Pesa',
      'mobile-money': 'Mobile Money'
    };
    return methods[method] || method;
  };

  const getRecipientDetailLabel = (method: string) => {
    switch (method) {
      case 'bank-deposit':
        return 'Bank Account';
      case 'ecocash':
      case 'mpesa':
      case 'mobile-money':
        return 'Mobile Number';
      default:
        return 'Contact Info';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 scroll-smooth"
    >
      <div className="text-center scroll-smooth">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Review Your Transfer</h3>
        <p className="text-muted-foreground">Please review the details before confirming</p>
      </div>

      <Card className="bg-muted/30 scroll-smooth">
        <CardContent className="p-6 space-y-4 scroll-smooth">
          {/* Transfer Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">You send:</span>
              <span className="text-xl font-bold">{formData.currency} {amount.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Transfer fee:</span>
              <span>- {formData.currency} {fee.toFixed(2)}</span>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total amount:</span>
              <span className="font-semibold">{formData.currency} {amount.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Exchange rate:</span>
              <span>1 {formData.currency} = {exchangeRate.toFixed(4)} {selectedCountry?.currency}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Recipient gets:</span>
              <span className="text-xl font-bold text-success">
                {selectedCountry?.currency} {receivedAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Details */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h4 className="font-semibold mb-4">Transfer Details</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Destination:</span>
              </div>
              <span className="font-medium">{selectedCountry?.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Delivery method:</span>
              </div>
              <span className="font-medium">{getDeliveryMethodName(formData.deliveryMethod)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Recipient:</span>
              </div>
              <span className="font-medium">{formData.recipientName}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{getRecipientDetailLabel(formData.deliveryMethod)}:</span>
              </div>
              <span className="font-medium">{formData.recipientDetails}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Payment method:</span>
              </div>
              <span className="font-medium">Credit/Debit Card</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collection Instructions */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-3 text-primary">Collection Instructions</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            {formData.deliveryMethod === 'cash-pickup' && (
              <p>The recipient can collect cash from any of our agent locations with a valid ID and the transaction reference number.</p>
            )}
            {formData.deliveryMethod === 'bank-deposit' && (
              <p>The money will be deposited directly into the recipient's bank account within 1-2 business days.</p>
            )}
            {(formData.deliveryMethod === 'ecocash' || formData.deliveryMethod === 'mpesa' || formData.deliveryMethod === 'mobile-money') && (
              <p>The money will be sent directly to the recipient's mobile wallet within minutes.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onEdit} className="flex-1">
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
        <Button onClick={onConfirm} className="flex-1 btn-hero">
          <Send className="w-4 h-4 mr-2" />
          Confirm & Send
        </Button>
      </div>
    </motion.div>
  );
};

export default ReviewTransaction;