import React from 'react';
import { motion } from 'framer-motion';
import ReviewTransaction from './ReviewTransaction';

interface Country {
  code: string;
  name: string;
  currency: string;
}

interface SendMoneyForm {
  destinationCountry: string;
  amount: string;
  currency: string;
  recipientName: string;
  recipientDetails: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
  senderMobile?: string;
  recipientMobile?: string;
}

interface SendMoneyStep3Props {
  formData: SendMoneyForm;
  countries: Country[];
  calculateFee: (amount: number, currency: string) => number;
  calculateReceivedAmount: (amount: number, currency: string) => number;
  onConfirm: () => void;
  onEdit: () => void;
}

const SendMoneyStep3: React.FC<SendMoneyStep3Props> = ({
  formData,
  countries,
  calculateFee,
  calculateReceivedAmount,
  onConfirm,
  onEdit,
}) => {
  const selected = countries.find(c => c.code === formData.destinationCountry);

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <ReviewTransaction
        formData={formData}
        selectedCountry={selected}
        calculateFee={(amt) => calculateFee(amt, selected?.currency || 'USD')}
        calculateReceivedAmount={(amt) => calculateReceivedAmount(amt, selected?.currency || 'USD')}
        onConfirm={onConfirm}
        onEdit={onEdit}
      />
    </motion.div>
  );
};

export default SendMoneyStep3;
