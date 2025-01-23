export const SMS_CONFIG = {
  ACCOUNT_SID: import.meta.env.VITE_TWILIO_ACCOUNT_SID,
  AUTH_TOKEN: import.meta.env.VITE_TWILIO_AUTH_TOKEN,
  FROM_NUMBER: import.meta.env.VITE_TWILIO_PHONE_NUMBER,
  API_URL: `https://api.twilio.com/2010-04-01/Accounts/${import.meta.env.VITE_TWILIO_ACCOUNT_SID}/Messages.json`,
  MOCK_ENABLED: false,
  MOCK_DELAY: 1000
} as const;