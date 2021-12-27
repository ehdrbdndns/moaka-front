import React from 'react';
import { IframeProps } from './types';

function Iframe(data: IframeProps) {
  return (
    <>
      <div className={'iframe ' + (data.isShow && 'show')} ref={data.elem}>
        <nav className="iframe__nav">
          <img
            src="/img/svg/left-arrow.svg"
            alt="뒤로가기"
            data-type="profile"
            className="iframe__close"
            onClick={() => {
              data.setIframeNo(0);
              data.setIsShow(false);
            }}
          />
          <span
            className="cursor-pointer"
            onClick={() => window.open(data.url)}
          >
            {data.title} (웹페이지가 보이지 않을 시 클릭)
          </span>
        </nav>
        {data.url !== '' && (
          <iframe
            title={data.title}
            className="iframe__content"
            src={data.url}
          ></iframe>
        )}
      </div>
    </>
  );
}

Iframe.defaultProps = {
  url: '',
};

export default Iframe;
