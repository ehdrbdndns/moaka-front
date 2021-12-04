import React, { useRef } from 'react';
import { toggleButton } from './event';
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
        onClick={() => toggleButton(buttonElem, data.isDisabled)}
      >
        {data.value}
      </div>
    </>
  );
}

Button.defaultProps = {
  type: 'outline', // 'primary', 'outline', 'text'
  isDisabled: false,
  value: 'Button',
};

export default Button;
