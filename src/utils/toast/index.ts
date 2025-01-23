import { createElement } from 'react';
import toast from 'react-hot-toast';
import { Info, CheckCircle, XCircle } from 'lucide-react';

const TOAST_CONFIG = {
  duration: 4000,
  className: 'font-medium'
};

export function showInfo(message: string) {
  toast(message, {
    icon: createElement(Info, { 
      className: 'h-5 w-5 text-blue-500',
      'aria-hidden': true
    }),
    duration: TOAST_CONFIG.duration,
    className: TOAST_CONFIG.className
  });
}

export function showSuccess(message: string) {
  toast.success(message, { 
    duration: TOAST_CONFIG.duration,
    className: TOAST_CONFIG.className
  });
}

export function showError(message: string) {
  toast.error(message, {
    duration: TOAST_CONFIG.duration, 
    className: TOAST_CONFIG.className
  });
}