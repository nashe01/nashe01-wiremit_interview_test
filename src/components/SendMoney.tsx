import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRates } from '@/context/RatesContext';
import { useToast } from '@/hooks/use-toast';
import ReviewTransaction from './ReviewTransaction';

interface SendMoneyForm {
  destinationCountry: string;
  amount: string;
  currency: string; // Will remain 'USD' for sending
  deliveryMethod: string;
  recipientName: string;
  recipientDetails: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
  senderMobile?: string;
}

const SendMoney: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SendMoneyForm>({
    destinationCountry: '',
    amount: '',
    currency: 'USD',
    deliveryMethod: '',
    recipientName: '',
    recipientDetails: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    senderMobile: '',
  });

  const { getRate } = useRates();
  const { toast } = useToast();

  const countries = [
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  ];

  const deliveryMethods = [
    { id: 'cash-pickup', name: 'Cash Pickup', description: 'Recipient collects cash from agent location' },
    { id: 'bank-deposit', name: 'Bank Deposit', description: 'Direct deposit to bank account' },
    { id: 'mobile-money', name: 'Mobile Money', description: 'Mobile money transfer' }
  ];

  const calculateFee = (amountUSD: number, targetCurrency: string): number => {
    let feeRate = 0.05;
    if (targetCurrency === 'GBP') feeRate = 0.1;
    else if (targetCurrency === 'ZAR') feeRate = 0.2;
    return Math.ceil(amountUSD * feeRate);
  };

  const calculateReceivedAmount = (amountUSD: number, targetCurrency: string): number => {
    if (amountUSD < 10 || amountUSD > 5000) return 0;
    const feeUSD = calculateFee(amountUSD, targetCurrency);
    const rate = getRate(targetCurrency);
    if (!rate) return 0;
    return Math.ceil((amountUSD - feeUSD) * rate);
  };

  const handleInputChange = (field: keyof SendMoneyForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4 && isStepValid(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        const amountNum = parseFloat(formData.amount) || 0;
        return !!(formData.destinationCountry && formData.amount && amountNum >= 10 && amountNum <= 5000);
      case 2:
        return !!formData.deliveryMethod;
      case 3:
        if (!formData.recipientName || !formData.recipientDetails) return false;
        if (formData.paymentMethod === 'credit-card') {
          return !!(formData.cardNumber && formData.cardExpiry && formData.cardCVV);
        } else if (formData.paymentMethod === 'mobile-money') {
          return !!formData.senderMobile;
        }
        return true;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        const selectedCountry = countries.find(c => c.code === formData.destinationCountry);
        const targetCurrency = selectedCountry?.currency || 'USD';
        const amountNum = parseFloat(formData.amount) || 0;

        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4">Where are you sending money?</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="country">Destination Country</Label>
                  <Select
                    value={formData.destinationCountry}
                    onValueChange={(value) => handleInputChange('destinationCountry', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select destination country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{country.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="text-lg"
                  />
                </div>

                {formData.amount && selectedCountry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted/50 rounded-lg"
                  >
                    {amountNum < 10 || amountNum > 5000 ? (
                      <div className="text-red-600 text-sm">
                        Amount must be between $10 and $5,000
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Transfer Fee (USD):</span>
                          <span>${calculateFee(amountNum, targetCurrency)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Recipient Gets:</span>
                          <span>
                            {calculateReceivedAmount(amountNum, targetCurrency)} {targetCurrency}
                          </span>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">How should the recipient receive the money?</h3>
            <div className="space-y-3">
              {deliveryMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.deliveryMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('deliveryMethod', method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{method.name}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.deliveryMethod === method.id
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Recipient & Payment Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  placeholder="Enter recipient's full name"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="recipientDetails">Recipient Contact Information</Label>
                <Input
                  id="recipientDetails"
                  placeholder="Enter account or mobile number"
                  value={formData.recipientDetails}
                  onChange={(e) => handleInputChange('recipientDetails', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Credit/Debit Card</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mobile-money">
                      <div className="flex items-center space-x-2">
                        <span>📱</span>
                        <span>Mobile Money</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.paymentMethod === 'credit-card' && (
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cardCVV}
                        onChange={(e) => handleInputChange('cardCVV', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'mobile-money' && (
                <div>
                  <Label htmlFor="senderMobile">Sender Mobile Number</Label>
                  <Input
                    id="senderMobile"
                    placeholder="Enter your mobile number"
                    value={formData.senderMobile}
                    onChange={(e) => handleInputChange('senderMobile', e.target.value)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        );

      case 4:
        const selected = countries.find(c => c.code === formData.destinationCountry);
        return (
          <ReviewTransaction
            formData={formData}
            selectedCountry={selected}
            calculateFee={(amt) => calculateFee(amt, selected?.currency || 'USD')}
            calculateReceivedAmount={(amt) => calculateReceivedAmount(amt, selected?.currency || 'USD')}
            onConfirm={() => {
              toast({
                title: "Transfer Initiated!",
                description: `Your transfer of $${formData.amount} USD to ${formData.recipientName} has been initiated.`,
              });
              setFormData({
                destinationCountry: '',
                amount: '',
                currency: 'USD',
                deliveryMethod: '',
                recipientName: '',
                recipientDetails: '',
                paymentMethod: 'credit-card',
                cardNumber: '',
                cardExpiry: '',
                cardCVV: '',
                senderMobile: '',
              });
              setCurrentStep(1);
            }}
            onEdit={() => setCurrentStep(1)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 scroll-smooth">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 scroll-smooth">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`flex items-center ${
              step < currentStep ? 'text-primary' : step === currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                step < currentStep
                  ? 'bg-primary border-primary text-white'
                  : step === currentStep
                  ? 'border-primary text-primary'
                  : 'border-muted-foreground text-muted-foreground'
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
            {step < 4 && (
              <div
                className={`w-16 h-0.5 mx-2 ${
                  step < currentStep ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 scroll-smooth">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button onClick={nextStep} disabled={!isStepValid(currentStep)}>
          {currentStep === 4 ? 'Review & Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default SendMoney;

