import React from 'react';
import Favicon from '../Favicon/Favicon';
import { LinkBoxProps } from './type';

function LinkBox(data: LinkBoxProps) {
  return (
    <>
      <article
        className={'link-box'}
        id={data.id}
        onClick={() => {
          // onClickLink()
        }}
      >
        <div className="link-box__header">
          <Favicon type="link" src={data.favicon_src} />
          <span className="link-box__title">{data.url}</span>
        </div>
        <div className="link-box__description">{data.description}</div>
      </article>
    </>
  );
}

LinkBox.defaultProps = {
  url: 'naver.com',
  favicon_src: '/img/link-favicon.png',
  description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Dolorem provident sapiente assumenda ducimus vel ipsam dolorum modi,
     tempore velit fugiat cumque corrupti ab beatae sunt itaque illum fugit minus quas.`,
};

export default LinkBox;
