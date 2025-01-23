import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { validatePhoneNumber, formatPhoneNumber } from '../../utils/phone';
import { showError, showSuccess } from '../../utils/toast';
import { FormInput } from '../ui/FormInput';

interface SignUpFormProps {
  onSuccess: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const updateField = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone)) {
      showError('Please enter a valid South African mobile number');
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(formData.phone);
      if (!formattedPhone) {
        throw new Error('Invalid phone number format');
      }

      // Sign up with phone
      const { error: signUpError } = await supabase.auth.signInWithOtp({
        phone: formattedPhone
      });

      if (signUpError) throw signUpError;

      // Create customer profile
      const { error: customerError } = await supabase
        .from('customers')
        .insert({
          phone: formattedPhone,
          first_name: formData.firstName,
          last_name: formData.lastName
        });

      if (customerError) throw customerError;

      showSuccess('Verification code sent to your phone');
      onSuccess();
    } catch (error) {
      console.error('Signup error:', error);
      showError(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          value={formData.firstName}
          onChange={updateField('firstName')}
          required
        />
        <FormInput
          label="Last Name"
          value={formData.lastName}
          onChange={updateField('lastName')}
          required
        />
      </div>

      <FormInput
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={updateField('phone')}
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