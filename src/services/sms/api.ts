import { SMS_CONFIG } from './config';
import { Debug } from '../../utils/debug';
import { sendMockSMS } from './mock';
import { sendRequest } from './client';
import { validatePhoneNumber, validateMessage } from './validation';
import { ValidationError } from './errors';
import type { SMSMessage, SMSResponse } from './types';

const MODULE = 'SMS_API';

export async function sendSMS(to: string, message: string): Promise<SMSResponse> {
  Debug.info(MODULE, 'Preparing to send SMS', { to });

  // Validate inputs
  if (!validatePhoneNumber(to)) {
    throw new ValidationError('Invalid phone number format');
  }

  if (!validateMessage(message)) {
    throw new ValidationError('Invalid message content');
  }

  const smsMessage: SMSMessage = {
    to,
    body: message,
    encoding: 'TEXT',
    userSuppliedId: crypto.randomUUID()
  };

  try {
    // Always use real SMS service
    const response = await sendRequest(smsMessage);
    Debug.info(MODULE, 'SMS sent successfully', { messageId: response.id });
    return response;
  } catch (error) {
    Debug.error(MODULE, 'SMS sending failed', error);
    throw error;
  }
}