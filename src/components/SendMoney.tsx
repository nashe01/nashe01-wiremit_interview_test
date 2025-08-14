import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, DollarSign, CreditCard, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRates } from '@/context/RatesContext';
import { useToast } from '@/hooks/use-toast';
import ReviewTransaction from './ReviewTransaction';
import feesData from '@/data/fees.json';

interface SendMoneyForm {
  destinationCountry: string;
  amount: string;
  currency: string;
  deliveryMethod: string;
  recipientName: string;
  recipientDetails: string;
  paymentMethod: string;
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
    paymentMethod: 'credit-card'
  });
  
  const { getRate } = useRates();
  const { toast } = useToast();

  const countries = [
    { code: 'ZW', name: 'Zimbabwe', currency: 'ZWL' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'GH', name: 'Ghana', currency: 'GHS' }
  ];

  const deliveryMethods = [
    { id: 'cash-pickup', name: 'Cash Pickup', description: 'Recipient collects cash from agent location' },
    { id: 'bank-deposit', name: 'Bank Deposit', description: 'Direct deposit to bank account' },
    { id: 'ecocash', name: 'EcoCash', description: 'Mobile money transfer (Zimbabwe)' },
    { id: 'mpesa', name: 'M-Pesa', description: 'Mobile money transfer (Kenya)' },
    { id: 'mobile-money', name: 'Mobile Money', description: 'General mobile money transfer' }
  ];

  const currencies = ['USD', 'EUR', 'ZAR'];

  const calculateFee = (amount: number, currency: string): number => {
    const feeRate = feesData[currency as keyof typeof feesData] || 0.05;
    return amount * feeRate;
  };

  const calculateReceivedAmount = (amount: number, currency: string, targetCurrency: string): number => {
    const fee = calculateFee(amount, currency);
    const amountAfterFee = amount - fee;
    const exchangeRate = getRate(targetCurrency);
    return Math.ceil(amountAfterFee * exchangeRate); // Round UP as specified
  };

  const handleInputChange = (field: keyof SendMoneyForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.destinationCountry && formData.amount && formData.currency);
      case 2:
        return !!formData.deliveryMethod;
      case 3:
        return !!(formData.recipientName && formData.recipientDetails);
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={formData.currency} 
                      onValueChange={(value) => handleInputChange('currency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.amount && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex justify-between text-sm">
                      <span>Transfer Fee:</span>
                      <span>{formData.currency} {calculateFee(parseFloat(formData.amount), formData.currency).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>You send:</span>
                      <span>{formData.currency} {formData.amount}</span>
                    </div>
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
            <h3 className="text-lg font-semibold">Recipient Details</h3>
            
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
                <Label htmlFor="recipientDetails">
                  {formData.deliveryMethod === 'bank-deposit' ? 'Bank Account Number' :
                   formData.deliveryMethod === 'ecocash' || formData.deliveryMethod === 'mpesa' || formData.deliveryMethod === 'mobile-money' ? 'Mobile Number' :
                   'Contact Information'}
                </Label>
                <Input
                  id="recipientDetails"
                  placeholder={
                    formData.deliveryMethod === 'bank-deposit' ? 'Enter bank account number' :
                    formData.deliveryMethod === 'ecocash' || formData.deliveryMethod === 'mpesa' || formData.deliveryMethod === 'mobile-money' ? 'Enter mobile number' :
                    'Enter contact information'
                  }
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
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        const selectedCountry = countries.find(c => c.code === formData.destinationCountry);
        return (
          <ReviewTransaction
            formData={formData}
            selectedCountry={selectedCountry}
            calculateFee={calculateFee}
            calculateReceivedAmount={calculateReceivedAmount}
            onConfirm={() => {
              toast({
                title: "Transfer Initiated!",
                description: `Your transfer of ${formData.currency} ${formData.amount} to ${formData.recipientName} has been initiated.`,
              });
              // Reset form
              setFormData({
                destinationCountry: '',
                amount: '',
                currency: 'USD',
                deliveryMethod: '',
                recipientName: '',
                recipientDetails: '',
                paymentMethod: 'credit-card'
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Send Money</span>
        </CardTitle>
        
        {/* Progress Steps */}
        <div className="flex items-center space-x-2 mt-4">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`h-1 w-8 transition-colors ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className="btn-hero"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default SendMoney;