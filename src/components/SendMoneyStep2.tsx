import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface SendMoneyStep2Props {
  formData: {
    paymentMethod: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCVV?: string;
    senderMobile?: string;
    recipientName: string;
    recipientDetails: string;
    recipientMobile?: string;
    destinationCountry: string;
  };
  onInputChange: (field: string, value: string) => void;
  formatCardNumber: (value: string) => string;
  validateCardNumber: (cardNumber: string) => boolean;
  validateExpiry: (expiry: string) => boolean;
  validateCVV: (cvv: string) => boolean;
  validateMobileNumber: (number: string) => boolean;
  validateBankAccount: (account: string) => boolean;
}

const SendMoneyStep2: React.FC<SendMoneyStep2Props> = ({
  formData,
  onInputChange,
  formatCardNumber,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateMobileNumber,
  validateBankAccount,
}) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold">Recipient & Payment Details</h3>
      <div className="space-y-4">
        {/* Payment Method / Sender logic */}
        <div>
          <Label>Payment Method</Label>
          <Select
            value={formData.paymentMethod}
            onValueChange={(value) => onInputChange('paymentMethod', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
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
            <Label>Card Number</Label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => onInputChange('cardNumber', formatCardNumber(e.target.value))}
            />
            {!validateCardNumber(formData.cardNumber || '') && formData.cardNumber && (
              <p className="text-red-600 text-sm">Invalid card number</p>
            )}
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label>Expiry</Label>
                <Input
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={(e) => onInputChange('cardExpiry', e.target.value)}
                />
                {!validateExpiry(formData.cardExpiry || '') && formData.cardExpiry && (
                  <p className="text-red-600 text-sm">Invalid expiry date</p>
                )}
              </div>
              <div className="flex-1">
                <Label>CVV</Label>
                <Input
                  placeholder="123"
                  value={formData.cardCVV}
                  onChange={(e) => onInputChange('cardCVV', e.target.value)}
                />
                {!validateCVV(formData.cardCVV || '') && formData.cardCVV && (
                  <p className="text-red-600 text-sm">Invalid CVV</p>
                )}
              </div>
            </div>
          </div>
        )}

        {formData.paymentMethod === 'mobile-money' && (
          <div>
            <Label>Sender Mobile Number</Label>
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry={(formData.destinationCountry || 'ZW') as any}
              value={formData.senderMobile}
              onChange={(value) => onInputChange('senderMobile', value || '')}
            />
            {!validateMobileNumber(formData.senderMobile || '') && formData.senderMobile && (
              <p className="text-red-600 text-sm">Invalid mobile number. Include country code</p>
            )}
          </div>
        )}

        {/* Recipient Name */}
        <div>
          <Label>Recipient Name</Label>
          <Input
            placeholder="Enter recipient's full name"
            value={formData.recipientName}
            onChange={(e) => onInputChange('recipientName', e.target.value)}
          />
        </div>

        {/* Recipient Contact (Bank / Mobile side by side) */}
        <div>
          <Label>Recipient Contact Information</Label>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Bank Account Number"
                value={formData.recipientDetails}
                onChange={(e) => onInputChange('recipientDetails', e.target.value)}
              />
              {formData.recipientDetails && !validateBankAccount(formData.recipientDetails) && (
                <p className="text-red-600 text-sm">Invalid bank account</p>
              )}
            </div>
            <span className="whitespace-nowrap font-semibold">or</span>
            <div className="flex-1">
              <PhoneInput
                placeholder="Recipient Mobile Number"
                defaultCountry={(formData.destinationCountry || 'ZW') as any}
                value={formData.recipientMobile}
                onChange={(value) => onInputChange('recipientMobile', value || '')}
              />
              {formData.recipientMobile && !validateMobileNumber(formData.recipientMobile) && (
                <p className="text-red-600 text-sm">Invalid mobile number. Include country code</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SendMoneyStep2;
