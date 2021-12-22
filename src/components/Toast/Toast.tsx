import React from 'react';
import { ToastProps } from './types';

function Toast(data: ToastProps) {
  return (
    <>
      <div
        ref={data.toastElem}
        className={'toast toast-' + data.type + ' toast-show-' + data.showType}
      >
        <span className="toast__message">{data.message}</span>
      </div>
    </>
  );
}

Toast.defaultProps = {
  type: 'default',
  message: 'Message',
  showType: 'normal',
  toastElem: null,
};

export default Toast;
