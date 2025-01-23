import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { showError, showSuccess } from '../../utils/toast';
import { FormInput } from '../ui/FormInput';

interface VerifyOtpFormProps {
  phone: string;
  onSuccess: () => void;
  onResend: () => void;
}

export function VerifyOtpForm({ phone, onSuccess, onResend }: VerifyOtpFormProps) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms'
      });

      if (error) {
        if (error.message.includes('expired') || error.status === 403) {
          showError('Verification code has expired. Please request a new one.');
          onResend();
          return;
        }
        throw error;
      }

      if (!data.session) {
        throw new Error('No session created after verification');
      }

      // Store the session
      await supabase.auth.setSession(data.session);

      // First try to find existing customer
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('phone', phone)
        .single();

      if (existingCustomer) {
        // Update existing customer with auth_id
        await supabase
          .from('customers')
          .update({ auth_id: data.session.user.id })
          .eq('id', existingCustomer.id);
      } else {
        // Create new customer
        await supabase
          .from('customers')
          .insert({
            phone,
            auth_id: data.session.user.id
          });
      }
      
      showSuccess('Phone verified successfully');
      onSuccess();
    } catch (error) {
      console.error('Verification error:', error);
      showError(error instanceof Error ? error.message : 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Verification Code"
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
        placeholder="Enter 6-digit code"
        icon={<KeyRound className="h-5 w-5 text-gray-400" />}
        required
        pattern="\d{6}"
        maxLength={6}
        helpText="Enter the verification code sent to your phone"
      />

      <button
        type="submit"
        disabled={loading || token.length !== 6}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify Code'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Didn't receive the code?{' '}
        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          className="text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
        >
          Resend
        </button>
      </p>
    </form>
  );
}