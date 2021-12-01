import React from 'react';
import { onFocus, onBlur } from './event';
import { InputProps } from './type';

function Input(data: InputProps) {
  return (
    <>
      <div className={'input-box ' + (data.error !== '' ? 'error' : '')}>
        <div className="wrapper w-100">
          {data.prefix !== '' && (
            <img src={data.prefix} alt="prefix" className="input-box__prefix" />
          )}
          <input
            type="text"
            placeholder={data.placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            className="input-box__input"
          />
        </div>
        {data.suffix !== '' && (
          <img src={data.suffix} alt="suffix" className="input-box__suffix" />
        )}
      </div>
      {data.error !== '' && (
        <div className="input-box__error">{data.error}</div>
      )}
    </>
  );
}

Input.defaultProps = {
  prefix: '',
  suffix: '',
  value: '',
  error: '',
  placeholder: '',
};

export default Input;
