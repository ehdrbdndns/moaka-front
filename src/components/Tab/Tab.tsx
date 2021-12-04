import React from 'react';
import { onClickTab } from './event';
import { TabProps } from './type';

function Tab(data: TabProps) {
  return (
    <>
      <div className="tab">
        <div
          className={'tab__item ' + (data.mode.current || 'active')}
          id={data.firstId}
          onClick={() =>
            onClickTab(data.firstId, data.secondId, 'first', data.mode)
          }
        >
          비공개
        </div>
        <div
          className={'tab__item ' + (data.mode.current && 'active')}
          id={data.secondId}
          onClick={() =>
            onClickTab(data.secondId, data.firstId, 'second', data.mode)
          }
        >
          공개
        </div>
      </div>
    </>
  );
}

export default Tab;
