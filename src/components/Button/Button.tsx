import React, { useRef } from 'react';
// import { toggleButton } from './event';
import { ButtonProps } from './type';

function Button(data: ButtonProps) {
  const buttonElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={
          'button ' + data.type + ' ' + (data.isDisabled && 'disabled')
        }
        ref={buttonElem}
        onClick={() => {
          data.onClick();
          // toggleButton(buttonElem, data.isDisabled);
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
    </>
  );
}

Button.defaultProps = {
  type: 'outline', // 'primary', 'outline', 'outline-text', 'text'
  isDisabled: false,
  value: 'Button',
  onClick: () => {},
};

export default Button;
