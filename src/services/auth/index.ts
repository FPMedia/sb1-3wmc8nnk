// Core auth functionality
export { checkAuth, refreshSession, signOut } from './session';
export { requestPhoneOtp, verifyPhoneOtp } from './phone';

// Customer-specific auth
export {
  getCustomerSession,
  getVerifiedPhone,
  getCustomerProfile,
  signInCustomer,
  signOutCustomer
} from './customer';

// Types
export type { CustomerSession, CustomerProfile } from './types';