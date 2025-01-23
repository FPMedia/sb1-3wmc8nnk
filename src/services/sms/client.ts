import { SMS_CONFIG } from './config';
import { Debug } from '../../utils/debug';
import { NetworkError } from './errors';
import type { SMSMessage, SMSResponse } from './types';

const MODULE = 'SMS_CLIENT';

function getAuthToken() {
  return btoa(`${SMS_CONFIG.ACCOUNT_SID}:${SMS_CONFIG.AUTH_TOKEN}`);
}

export async function sendRequest(message: SMSMessage): Promise<SMSResponse> {
  Debug.info(MODULE, 'Sending SMS request', { to: message.to });

  const formData = new URLSearchParams();
  formData.append('To', message.to);
  formData.append('From', SMS_CONFIG.FROM_NUMBER);
  formData.append('Body', message.body);

  try {
    const response = await fetch(SMS_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${getAuthToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new NetworkError(errorData.message || 'Failed to send SMS');
    }

    const data = await response.json();
    return {
      id: data.sid,
      type: 'twilio',
      from: data.from,
      to: data.to,
      body: data.body,
      status: {
        id: data.status,
        type: data.status
      }
    };
  } catch (error) {
    Debug.error(MODULE, 'Request failed', error);
    throw error instanceof Error ? error : new NetworkError('Network request failed');
  }
}