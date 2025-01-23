import React, { useState } from 'react';
import { Debug } from '../../utils/debug';
import { PhoneForm } from './PhoneForm';
import { CodeForm } from './CodeForm';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { initiateVerification, completeVerification } from '../../services/verification/process';
import toast from 'react-hot-toast';

const MODULE = 'PHONE_VERIFICATION';

interface PhoneVerificationProps {
  onSuccess: () => void;
  mode?: 'auth' | 'checkout';
}

export function PhoneVerification({ onSuccess, mode = 'checkout' }: PhoneVerificationProps) {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'phone' | 'verify' | 'details'>('phone');
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isNew = await initiateVerification(phone);
      setIsNewCustomer(isNew);
      setStep('verify');
      toast.success('Verification code sent!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isNewCustomer) {
        setStep('details');
        setLoading(false);
        return;
      }

      await completeVerification(phone, verificationCode);
      toast.success(mode === 'auth' ? 'Signed in successfully!' : 'Verified successfully!');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed');
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await completeVerification(phone, verificationCode, customerDetails);
      toast.success(mode === 'auth' ? 'Account created successfully!' : 'Account created and verified!');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
      setLoading(false);
    }
  };

  const handleDetailsChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {step === 'phone' ? (mode === 'auth' ? 'Sign In' : 'Verify Your Phone') :
           step === 'verify' ? 'Enter Verification Code' :
           'Complete Your Profile'}
        </h2>

        {step === 'phone' && (
          <PhoneForm
            phone={phone}
            loading={loading}
            onPhoneChange={setPhone}
            onSubmit={handleSendCode}
          />
        )}

        {step === 'verify' && (
          <CodeForm
            code={verificationCode}
            loading={loading}
            onCodeChange={setVerificationCode}
            onSubmit={handleVerifyCode}
            onResend={handleSendCode}
          />
        )}

        {step === 'details' && (
          <CustomerDetailsForm
            loading={loading}
            onSubmit={handleDetailsSubmit}
            values={customerDetails}
            onChange={handleDetailsChange}
          />
        )}
      </div>
    </div>
  );
}