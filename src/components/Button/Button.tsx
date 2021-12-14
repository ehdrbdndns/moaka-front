import React, { useRef } from 'react';
import { addButton } from './event';
// import { toggleButton } from './event';
import { ButtonProps } from './type';

function Button(data: ButtonProps) {
  const buttonElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div>
        <div
          className={
            'button ' + data.type + ' ' + (data.isDisabled && 'disabled')
          }
          ref={buttonElem}
          onClick={() => {
            if (!data.isDisabled) {
              data.onClick();
              data.isPressed && addButton(buttonElem);
            }
          }}
        >
          {data.type === 'google' && (
            <img
              src="/img/google-logo.svg"
              alt="구글 로고"
              className="button__img"
            />
          )}
          {data.value}
        </div>
      </div>
    </>
  );
}

Button.defaultProps = {
  type: 'outline', // 'primary', 'outline', 'outline-text', 'text'
  isDisabled: false,
  isPressed: false,
  value: 'Button',
  onClick: () => {},
};

export default Button;
