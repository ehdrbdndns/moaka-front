import React from 'react';

function SidebarSkeleton() {
  return (
    <>
      <div className="skeleton skeleton-sidebar">
        <div className="skeleton-sidebar__title"></div>
        <ul className="skeleton-sidebar__content-list">
          <li className="skeleton-sidebar__content"></li>
          <li className="skeleton-sidebar__content"></li>
          <li className="skeleton-sidebar__content"></li>
        </ul>
      </div>
    </>
  );
}

export default SidebarSkeleton;
