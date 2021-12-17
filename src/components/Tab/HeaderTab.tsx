import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function HeaderTab() {
  let location = useLocation();

  return (
    <>
      <div className="tab">
        <Link to="/">
          <div
            className={'tab__item ' + (location.pathname === '/' && 'active')}
          >
            홈
          </div>
        </Link>
        <Link to="/mypage">
          <div
            className={
              'tab__item ' + (location.pathname === '/mypage' && 'active')
            }
          >
            마이페이지
          </div>
        </Link>
      </div>
    </>
  );
}

export default HeaderTab;
