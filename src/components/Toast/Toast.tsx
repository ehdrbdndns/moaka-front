import React from 'react';
import { ToastProps } from './types';

function Toast(data: ToastProps) {
  return (
    <>
      <div className={'toast toast-' + data.type}>
        <span className="toast__message">{data.message}</span>
      </div>
    </>
  );
}

Toast.defaultProps = {
  type: 'default',
  message: 'Message',
};

export default Toast;
