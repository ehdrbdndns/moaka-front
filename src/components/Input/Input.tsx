import React from 'react';
import { onFocus, onBlur } from './event';
import { InputProps } from './type';
function Input(data: InputProps) {
  return (
    <>
      <div>
        <div className={'input-box ' + (data.error !== '' ? 'error' : '')}>
          <div className="wrapper w-100">
            {data.prefix !== '' && (
              <img
                src={data.prefix}
                alt="prefix"
                className="input-box__prefix"
              />
            )}
            <input
              type={data.type}
              placeholder={data.placeholder}
              onFocus={onFocus}
              onBlur={e => {
                data.onBlur(e);
                onBlur(e);
              }}
              value={data.value}
              onChange={e => data.setValue(e.target.value)}
              disabled={data.disabled}
              onKeyPress={data.onKeyPress}
              tabIndex={data.tabindex}
              className="input-box__input"
            />
          </div>
          {data.suffix !== '' && (
            <img
              src={data.suffix}
              alt="suffix"
              className="input-box__suffix"
              onClick={data.onClickOfSuffix}
            />
          )}
        </div>
        {data.error !== '' && (
          <div className="input-box__error">{data.error}</div>
        )}
      </div>
    </>
  );
}

Input.defaultProps = {
  prefix: '',
  suffix: '',
  type: 'text',
  value: '',
  setValue: () => {},
  onKeyPress: () => {},
  onBlur: () => {},
  onClickOfSuffix: () => {},
  disabled: false,
  error: '',
  placeholder: '',
  tabindex: 0,
};

export default Input;
