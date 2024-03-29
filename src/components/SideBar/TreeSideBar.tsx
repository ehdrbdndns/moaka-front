import React from 'react';
import LinkTree from '../Tree/LinkTree';
import { TreeSideBarProps } from './types';

function TreeSideBar(data: TreeSideBarProps) {
  return (
    <>
      <article className="sidebar" ref={data.sidebarElem}>
        <div className="sidebar__header">
          <h1 className="sidebar__title">링크 트리</h1>
        </div>
        <div className="sidebar__content">
          {data.openTree && (
            <LinkTree
              iframeLinkNo={data.iframeLinkNo}
              openIframe={data.openIframe}
              sectionInfoList={data.sectionInfoList}
            ></LinkTree>
          )}
        </div>
      </article>
    </>
  );
}

export default TreeSideBar;
