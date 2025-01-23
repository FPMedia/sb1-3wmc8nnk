export interface SMSMessage {
  to: string;
  body: string;
  encoding: 'TEXT';
  userSuppliedId: string;
}

export interface SMSResponse {
  id: string;
  type: string;
  from: string;
  to: string;
  body: string;
  status: {
    id: string;
    type: string;
    subtype?: string;
  };
}

export interface SMSError {
  code: string;
  message: string;
  details?: unknown;
}