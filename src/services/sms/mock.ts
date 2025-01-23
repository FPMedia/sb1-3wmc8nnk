import { Debug } from '../../utils/debug';
import type { SMSResponse } from './types';
import { SMS_CONFIG } from './config';

const MODULE = 'MOCK_SMS';

export async function sendMockSMS(to: string, message: string): Promise<SMSResponse> {
  Debug.info(MODULE, 'Sending mock SMS', { to, message });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, SMS_CONFIG.MOCK_DELAY));
  
  const mockResponse: SMSResponse = {
    id: crypto.randomUUID(),
    type: 'mock',
    from: 'MOCK_SENDER',
    to,
    body: message,
    status: {
      id: '0',
      type: 'accepted'
    }
  };

  Debug.debug(MODULE, 'Mock SMS sent successfully', mockResponse);
  return mockResponse;
}