import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone } from 'lucide-react';
import { showSuccess, showError } from '../utils/toast';
import { formatPhoneNumber, validatePhoneNumber } from '../utils/phone';

export function AdminRoleAssignment() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validatePhoneNumber(phone)) {
        throw new Error('Invalid phone number format');
      }

      const formattedPhone = formatPhoneNumber(phone);
      if (!formattedPhone) {
        throw new Error('Could not format phone number');
      }

      const { error: updateError } = await supabase.rpc('assign_admin_role_by_phone', {
        phone_number: formattedPhone
      });

      if (updateError) throw updateError;

      showSuccess('Admin role assigned successfully');
      setPhone('');
    } catch (error) {
      console.error('Error assigning admin role:', error);
      showError(error instanceof Error ? error.message : 'Failed to assign admin role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Assign Admin Role
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0721234567"
                required
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Enter South African mobile number (e.g., 0721234567)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Assigning...' : 'Assign Admin Role'}
          </button>
        </form>
      </div>
    </div>
  );
}