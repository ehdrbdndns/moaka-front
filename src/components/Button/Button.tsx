import React, { useRef } from 'react';
import { ButtonProps } from './type';
import DotLoader from 'react-spinners/DotLoader';
import { addPressButton } from './event';
function Button(data: ButtonProps) {
  const buttonElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={
          'button ' +
          data.type +
          ' ' +
          (data.isDisabled && 'disabled') +
          ' ' +
          data.size
        }
        style={{ width: data.width !== 0 ? data.width : '100%' }}
        ref={data.buttonElem !== null ? data.buttonElem : buttonElem}
        onClick={() => {
          if (!data.isDisabled) {
            data.onClick();
            data.isPressed && addPressButton(buttonElem);
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
        {data.isLoading ? (
          <DotLoader size="18px" color="#A1C0FB" />
        ) : (
          data.value
        )}
        {/* {data.value} */}
      </div>
    </>
  );
}

Button.defaultProps = {
  buttonElem: null,
  width: 0,
  type: 'outline', // 'primary', 'outline', 'outline-text', 'text'
  size: 'm',
  isDisabled: false,
  isLoading: false,
  isPressed: false,
  value: 'Button',
  onClick: () => {},
};

export default Button;
