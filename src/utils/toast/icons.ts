import { createElement } from 'react';
import { Info, CheckCircle, XCircle } from 'lucide-react';
import { TOAST_CONFIG } from './config';

const createIcon = (Icon: typeof Info | typeof CheckCircle | typeof XCircle, colorClass: string) => 
  createElement(Icon, {
    className: `${TOAST_CONFIG.iconSize} ${colorClass}`,
    'aria-hidden': 'true'
  });

export const icons = {
  info: () => createIcon(Info, TOAST_CONFIG.iconColors.info),
  success: () => createIcon(CheckCircle, TOAST_CONFIG.iconColors.success),
  error: () => createIcon(XCircle, TOAST_CONFIG.iconColors.error)
};