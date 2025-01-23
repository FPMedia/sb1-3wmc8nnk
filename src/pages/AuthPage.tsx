import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { VerifyOtpForm } from '../components/auth/VerifyOtpForm';

type AuthStep = 'signIn' | 'signUp' | 'verify';

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<AuthStep>('signIn');
  const [isSignUp, setIsSignUp] = useState(false);
  const [phone, setPhone] = useState('');
  const from = (location.state?.from as string) || '/';

  const handlePhoneSubmit = (submittedPhone: string) => {
    setPhone(submittedPhone);
    setStep('verify');
  };

  const handleVerificationSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleResendCode = () => {
    setStep(isSignUp ? 'signUp' : 'signIn');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {step === 'verify' ? 'Verify Your Phone' :
             isSignUp ? 'Create Account' : 'Sign In'}
          </h2>

          {step === 'verify' ? (
            <VerifyOtpForm
              phone={phone}
              onSuccess={handleVerificationSuccess}
              onResend={handleResendCode}
            />
          ) : isSignUp ? (
            <SignUpForm onSuccess={(submittedPhone) => handlePhoneSubmit(submittedPhone)} />
          ) : (
            <SignInForm onSuccess={(submittedPhone) => handlePhoneSubmit(submittedPhone)} />
          )}

          {step !== 'verify' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}