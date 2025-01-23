import { PAYFAST_CONFIG } from './config';
import { PayfastPayment } from './types';


export async function initiatePayment(
  orderId: string,
  amount: number,
  itemName: string,
  customerDetails?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }
): Promise<string> {
  const paymentData: Partial<PayfastPayment> = {
    merchant_id: PAYFAST_CONFIG.MERCHANT_ID,
    merchant_key: PAYFAST_CONFIG.MERCHANT_KEY,
    return_url: PAYFAST_CONFIG.RETURN_URL,
    cancel_url: PAYFAST_CONFIG.CANCEL_URL,
    notify_url: PAYFAST_CONFIG.NOTIFY_URL,
    m_payment_id: orderId,
    amount: amount.toFixed(2),
    item_name: itemName,
    name_first: customerDetails?.firstName,
    name_last: customerDetails?.lastName,
    email_address: customerDetails?.email,
  };

  const passphrase = PAYFAST_CONFIG.PASSPHRASE;
  const data = paymentData;
  // Generate signature
  // const signature = generateSignature(paymentData, PAYFAST_CONFIG.PASSPHRASE);
  // Call Netlify function
  const response = await fetch('/.netlify/functions/payfastSignature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data,
      passphrase,  // omit this if your function uses process.env
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error);
  }

  const { signature } = await response.json();
  console.log('Signature from Netlify function:', signature);

  paymentData.signature = signature;

  // Build PayFast URL
  const baseUrl = PAYFAST_CONFIG.SANDBOX_MODE
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process';

  // Convert payment data to URL parameters
  const params = new URLSearchParams();
  Object.entries(paymentData).forEach(([key, value]) => {
    if (value) params.append(key, value.toString());
  });

  return `${baseUrl}?${params.toString()}`;
}