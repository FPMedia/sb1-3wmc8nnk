import { createElement } from 'react';
import toast from 'react-hot-toast';
import { Info } from 'lucide-react';

export function showInfo(message: string) {
  toast(message, {
    icon: createElement(Info, { 
      className: "h-5 w-5 text-blue-500"
    }),
    duration: 4000
  });
}

export function showSuccess(message: string) {
  toast.success(message, { duration: 4000 });
}

export function showError(message: string) {
  toast.error(message, { duration: 4000 });
}