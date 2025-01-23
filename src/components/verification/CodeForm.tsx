import React from 'react';

interface CodeFormProps {
  code: string;
  loading: boolean;
  onCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: (e: React.FormEvent) => void;
}

export function CodeForm({ code, loading, onCodeChange, onSubmit, onResend }: CodeFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Verification Code
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          pattern="\d{6}"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={onResend}
            className="text-indigo-600 hover:text-indigo-500"
            disabled={loading}
          >
            Resend
          </button>
        </p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify and Place Order'}
      </button>
    </form>
  );
}