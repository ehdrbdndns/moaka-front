import React from 'react';
import { TabProps } from './type';

function Tab(data: TabProps) {
  return (
    <>
      <div className="tab">
        <div
          className={'tab__item ' + (data.activeMode === 'first' && 'active')}
          ref={data.firstElem}
          onClick={() => {
            data.onClickOfFirst();
          }}
        >
          {data.firstName}
        </div>
        <div
          className={'tab__item ' + (data.activeMode === 'second' && 'active')}
          ref={data.secondElem}
          onClick={() => {
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
