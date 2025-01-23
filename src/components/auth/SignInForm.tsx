import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { validatePhoneNumber, formatPhoneNumber } from '../../utils/phone';
import { showError, showSuccess } from '../../utils/toast';
import { FormInput } from '../ui/FormInput';

interface SignInFormProps {
  onSuccess: (phone: string) => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phone)) {
      showError('Please enter a valid South African mobile number');
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(phone);
      if (!formattedPhone) {
        throw new Error('Invalid phone number format');
      }

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          channel: 'sms'
        }
      });

      if (error) throw error;
      
      showSuccess('Verification code sent to your phone');
      onSuccess(formattedPhone);
    } catch (error) {
      console.error('Login error:', error);
      showError(error instanceof Error ? error.message : 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="0786828615"
        icon={<Phone className="h-5 w-5 text-gray-400" />}
        required
        helpText="Enter your South African mobile number (e.g., 0786828615)"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Sending Code...' : 'Send Verification Code'}
      </button>
    </form>
  );
}