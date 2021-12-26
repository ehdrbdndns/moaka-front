import React from 'react';

function SidebarSkeleton() {
  return (
    <>
      <div className="skeleton skeleton-sidebar">
        <div className="skeleton__title"></div>
        <ul className="skeleton__content-list">
          <li className="skeleton__content"></li>
          <li className="skeleton__content"></li>
          <li className="skeleton__content"></li>
        </ul>
      </div>
    </>
  );
}

export default SidebarSkeleton;
