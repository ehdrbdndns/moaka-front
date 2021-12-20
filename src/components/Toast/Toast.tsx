import React from 'react';
import { ToastProps } from './types';

function Toast(data: ToastProps) {
  return (
    <>
      <div className={'toast toast-' + data.type}>{data.message}</div>
    </>
  );
}

Toast.defaultProps = {
  type: 'default',
  message: 'Message',
};

export default Toast;
