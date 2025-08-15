import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRates } from '@/context/RatesContext';
import { useToast } from '@/hooks/use-toast';
import { isValidPhoneNumber } from 'react-phone-number-input';
import SendMoneyStep1 from './SendMoneyStep1';
import SendMoneyStep2 from './SendMoneyStep2';
import SendMoneyStep3 from './SendMoneyStep3';

interface SendMoneyForm {
  destinationCountry: string;
  amount: string;
  currency: string;
  recipientName: string;
  recipientDetails: string; // Bank account
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
  senderMobile?: string;
  recipientMobile?: string; // NEW field
}

const SendMoney: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SendMoneyForm>({
    destinationCountry: '',
    amount: '',
    currency: 'USD',
    recipientName: '',
    recipientDetails: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    senderMobile: '',
    recipientMobile: '', // NEW
  });

  const { getRate } = useRates();
  const { toast } = useToast();

  const countries = [
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  ];

  // --- Formatting ---
  const formatCardNumber = (value: string) => value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

  // --- Validation ---
  const validateCardNumber = (cardNumber: string) => {
    const clean = cardNumber.replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(clean)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateExpiry = (expiry: string) => {
    const cleaned = expiry.trim();
    const parts = cleaned.includes('/') ? cleaned.split('/') : [];
    if (parts.length !== 2) return false;
    let [month, year] = parts.map(p => p.trim());
    if (!/^\d{1,2}$/.test(month) || !/^\d{2,4}$/.test(year)) return false;
    const monthNum = parseInt(month, 10);
    const yearNum = year.length === 2 ? 2000 + parseInt(year, 10) : parseInt(year, 10);
    if (monthNum < 1 || monthNum > 12) return false;
    const now = new Date();
    const expiryDate = new Date(yearNum, monthNum - 1, 1);
    return expiryDate >= new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const validateCVV = (cvv: string) => /^[0-9]{3,4}$/.test(cvv);
  const validateMobileNumber = (number: string) => isValidPhoneNumber(number || '');
  const validateBankAccount = (account: string) => /^\d{6,20}$/.test(account);

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
    if (currentStep < 3 && isStepValid(currentStep)) setCurrentStep(prev => prev + 1);
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
        if (!formData.recipientName || !formData.paymentMethod) return false;
        if (formData.paymentMethod === 'credit-card') {
          return (
            !!formData.cardNumber &&
            !!formData.cardExpiry &&
            !!formData.cardCVV &&
            validateCardNumber(formData.cardNumber) &&
            validateExpiry(formData.cardExpiry) &&
            validateCVV(formData.cardCVV)
          );
        } else if (formData.paymentMethod === 'mobile-money') {
          return !!formData.senderMobile && validateMobileNumber(formData.senderMobile);
        }
        // Recipient must have either valid bank OR valid recipient mobile
        return validateBankAccount(formData.recipientDetails) || validateMobileNumber(formData.recipientMobile);

      default:
        return true;
    }
  };

  const handleConfirmSend = () => {
    toast({
      title: "Transfer Initiated!",
      description: `Your transfer of $${formData.amount} USD to ${formData.recipientName} has been initiated.`,
    });
    alert('Money sent successfully!');
    setFormData({
      destinationCountry: '',
      amount: '',
      currency: 'USD',
      recipientName: '',
      recipientDetails: '',
      paymentMethod: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      senderMobile: '',
      recipientMobile: '', // RESET
    });
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SendMoneyStep1
            formData={formData}
            countries={countries}
            onInputChange={handleInputChange}
            calculateFee={calculateFee}
            calculateReceivedAmount={calculateReceivedAmount}
          />
        );

      case 2:
        return (
          <SendMoneyStep2
            formData={formData}
            onInputChange={handleInputChange}
            formatCardNumber={formatCardNumber}
            validateCardNumber={validateCardNumber}
            validateExpiry={validateExpiry}
            validateCVV={validateCVV}
            validateMobileNumber={validateMobileNumber}
            validateBankAccount={validateBankAccount}
          />
        );

      case 3:
        return (
          <SendMoneyStep3
            formData={formData}
            countries={countries}
            calculateFee={calculateFee}
            calculateReceivedAmount={calculateReceivedAmount}
            onConfirm={handleConfirmSend}
            onEdit={() => setCurrentStep(1)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className={`flex items-center ${step <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${step < currentStep ? 'bg-primary border-primary text-white' : step === currentStep ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'}`}>
              {step < currentStep ? '✓' : step}
            </div>
            {step < 3 && <div className={`w-16 h-0.5 mx-2 ${step < currentStep ? 'bg-primary' : 'bg-muted-foreground'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>Previous</Button>
        {currentStep < 3 ? (
          <Button onClick={nextStep} disabled={!isStepValid(currentStep)}>Next</Button>
        ) : (
          <Button onClick={handleConfirmSend} disabled={!isStepValid(3)}>Review & Send</Button>
        )}
      </div>
    </div>
  );
};

export default SendMoney;

