import React from 'react';
import { Info, CheckCircle, XCircle } from 'lucide-react';

export const InfoIcon = () => (
  <Info className="h-5 w-5 text-blue-500" />
);

export const SuccessIcon = () => (
  <CheckCircle className="h-5 w-5 text-green-500" />
);

export const ErrorIcon = () => (
  <XCircle className="h-5 w-5 text-red-500" />
);