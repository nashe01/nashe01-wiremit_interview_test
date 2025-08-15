import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Country {
  code: string;
  name: string;
  currency: string;
}

interface SendMoneyStep1Props {
  formData: {
    destinationCountry: string;
    amount: string;
  };
  countries: Country[];
  onInputChange: (field: string, value: string) => void;
  calculateFee: (amount: number, currency: string) => number;
  calculateReceivedAmount: (amount: number, currency: string) => number;
}

const SendMoneyStep1: React.FC<SendMoneyStep1Props> = ({
  formData,
  countries,
  onInputChange,
  calculateFee,
  calculateReceivedAmount,
}) => {
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
      <h3 className="text-lg font-semibold mb-4">Where are you sending money?</h3>
      <div className="space-y-4">
        <div>
          <Label>Destination Country</Label>
          <Select
            value={formData.destinationCountry}
            onValueChange={(value) => onInputChange('destinationCountry', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select destination country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Amount (USD)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => onInputChange('amount', e.target.value)}
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
                  <span>{calculateReceivedAmount(amountNum, targetCurrency)} {targetCurrency}</span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SendMoneyStep1;
