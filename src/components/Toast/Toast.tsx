import React from 'react';
import { ToastProps } from './types';
import Button from '../Button/Button';
function Toast(data: ToastProps) {
  return (
    <>
      <div
        ref={data.toastElem}
        className={'toast toast-' + data.type + ' toast-show-' + data.showType}
        style={
          data.top !== 0 ? { transform: `translate(-50%, ${data.top}px)` } : {}
        }
      >
        <span className="toast__message">{data.message}</span>
        {data.isFirstButton && (
          <Button
            width={44}
            value={data.firstButtonValue}
            size="s"
            type="outline"
            onClick={data.onClickFirstButtonEvent}
          ></Button>
        )}
        {data.isSecondButton && (
          <Button
            width={44}
            value={data.secondButtonValue}
            size="s"
            type="outline"
            onClick={data.onClickSecondButtonEvent}
          ></Button>
        )}
      </div>
    </>
  );
}

Toast.defaultProps = {
  type: 'default',
  message: 'Message',
  showType: 'normal',
  toastElem: null,
  isFirstButton: false,
  firstButtonValue: '',
  isSecondButton: false,
  secondButtonValue: '',
  onClickFirstButtonEvent: () => {},
  onClickSecondButtonEvent: () => {},
  top: 40,
};

export default Toast;
