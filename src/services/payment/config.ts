export const PAYFAST_CONFIG = {
  MERCHANT_ID: '10036769',  // Sandbox merchant ID
  MERCHANT_KEY: 'or0bp1xobul4s',  // Sandbox merchant key
  SANDBOX_MODE: true,
  RETURN_URL: `${window.location.origin}/payment/success`,
  CANCEL_URL: `${window.location.origin}/payment/cancel`,
  NOTIFY_URL: `${window.location.origin}/api/payment/notify`,
  // PASSPHRASE: 'LiF3_B3ut1fulEv3ryDY', // Optional, only if configured in PayFast dashboard
} as const;