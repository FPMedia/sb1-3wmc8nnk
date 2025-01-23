import React, { useState } from 'react';
import { Phone, Lock } from 'lucide-react';
import { validatePhone, validatePassword } from '../../utils/validation';
import { signIn, signUp, createCustomerProfile } from '../../utils/auth';
import { showError, showSuccess, showInfo } from '../../utils/toast';
import { FormInput } from '../ui/FormInput';

interface PhoneAuthFormProps {
  isSignUp?: boolean;
  onSuccess: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  password: ''
};

export function PhoneAuthForm({ isSignUp = false, onSuccess }: PhoneAuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateField = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const validateForm = (): boolean => {
    if (isSignUp && (!formData.firstName || !formData.lastName)) {
      showError('Please enter your full name');
      return false;
    }

    if (!validatePhone(formData.phone)) {
      showError('Please enter a valid phone number');
      return false;
    }

    if (!validatePassword(formData.password)) {
      showError('Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isSignUp) {
        const { data: { user }, error: signUpError } = await signUp(
          formData.phone,
          formData.password,
          formData.firstName,
          formData.lastName
        );

        if (signUpError) throw signUpError;
        if (!user) throw new Error('Failed to create account');

        await createCustomerProfile(
          user.id,
          formData.phone,
          formData.firstName,
          formData.lastName
        );

        showSuccess('Account created successfully!');
        showInfo('You can now sign in with your phone number');
      } else {
        const { error: signInError } = await signIn(formData.phone, formData.password);
        if (signInError) throw signInError;
        showSuccess('Signed in successfully!');
      }

      onSuccess();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            value={formData.firstName}
            onChange={updateField('firstName')}
            required={isSignUp}
          />
          <FormInput
            label="Last Name"
            value={formData.lastName}
            onChange={updateField('lastName')}
            required={isSignUp}
          />
        </div>
      )}

      <FormInput
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={updateField('phone')}
        placeholder="+27721234567"
        icon={<Phone className="h-5 w-5 text-gray-400" />}
        required
      />

      <FormInput
        label="Password"
        type="password"
        value={formData.password}
        onChange={updateField('password')}
        placeholder="Min. 8 characters"
        icon={<Lock className="h-5 w-5 text-gray-400" />}
        minLength={8}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
      </button>
    </form>
  );
}