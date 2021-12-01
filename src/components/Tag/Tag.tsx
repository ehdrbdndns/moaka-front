import React from 'react';
import { TagProps } from './type';

function Tag(data: TagProps) {
  return (
    <>
      <div className={'tag ' + data.type}>{data.value}</div>
    </>
  );
}

Tag.defaultProps = {
  type: '',
  value: '태그',
};

export default Tag;
