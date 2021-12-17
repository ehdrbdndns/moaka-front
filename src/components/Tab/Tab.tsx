import React from 'react';
import { onClickTab } from './event';
import { TabProps } from './type';

function Tab(data: TabProps) {
  return (
    <>
      <div className="tab">
        <div
          className={'tab__item ' + (data.activeMode === 'first' && 'active')}
          id={data.firstId}
          onClick={() => {
            onClickTab(data.firstId, data.secondId, 'first');
            data.onClickOfFirst();
          }}
        >
          {data.firstName}
        </div>
        <div
          className={'tab__item ' + (data.activeMode === 'second' && 'active')}
          id={data.secondId}
          onClick={() => {
            onClickTab(data.secondId, data.firstId, 'second');
            data.onClickOfSecond();
          }}
        >
          {data.secondName}
        </div>
      </div>
    </>
  );
}

Tab.defaultProps = {
  onClickOfFirst: () => {},
  onClickOfSecond: () => {},
  activeMode: 'first',
};

export default Tab;
