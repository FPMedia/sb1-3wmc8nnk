import toast from 'react-hot-toast';

export function showInfo(message: string) {
  toast(message);
}

export function showSuccess(message: string) {
  toast.success(message);
}

export function showError(message: string) {
  toast.error(message);
}