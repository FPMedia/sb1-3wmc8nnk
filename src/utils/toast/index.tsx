import React from 'react';
import toast from 'react-hot-toast';
import { InfoIcon, SuccessIcon, ErrorIcon } from './icons';
import { TOAST_CONFIG } from './config';

export function showInfo(message: string) {
  toast(message, {
    icon: <InfoIcon />,
    duration: TOAST_CONFIG.duration,
    className: TOAST_CONFIG.className
  });
}

export function showSuccess(message: string) {
  toast(message, {
    icon: <SuccessIcon />,
    duration: TOAST_CONFIG.duration,
    className: TOAST_CONFIG.className
  });
}

export function showError(message: string) {
  toast(message, {
    icon: <ErrorIcon />,
    duration: TOAST_CONFIG.duration,
    className: TOAST_CONFIG.className
  });
}