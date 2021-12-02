import React from 'react';
import { ButtonProps } from './type';

function Button(data: ButtonProps) {
  return (
    <>
      <div className={'button ' + data.type}>{data.value}</div>
    </>
  );
}

Button.defaultProps = {
  type: 'primary',
  value: 'Button',
};

export default Button;
