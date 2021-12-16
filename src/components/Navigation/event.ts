import { RefObject } from 'react';

let prevNavItem: RefObject<HTMLLIElement>;
let prevSideItem: RefObject<HTMLDivElement> | null = null;

const onClickNavItem = (
  sideNavElem: RefObject<HTMLDivElement>,
  sideItem: RefObject<HTMLDivElement>,
  navItem: RefObject<HTMLLIElement>,
) => {
  // sideNav
  sideNavElem.current?.classList.add('active');

  // navigation
  if (navItem.current?.classList.contains('active')) {
    // 비활성화 로직 수행
    navItem.current?.classList.remove('active');
    sideNavElem.current?.classList.remove('active');
  } else {
    // 전에 활성화 된 네비게이션 끄기
    prevNavItem && prevNavItem.current?.classList.remove('active');
    prevNavItem = navItem;

    // 활성화 로직 수행
    navItem.current?.classList.add('active');
  }

  // sidebar
  if (sideItem.current?.classList.contains('show')) {
    // 비활성화 로직 수행
    sideItem.current?.classList.remove('show');
    sideNavElem.current?.classList.remove('active');
    prevSideItem = null;
  } else {
    if (prevSideItem !== null) {
      // 전에 활성화 된 사이드 바 닫은 후(.25초) 사이드바 활성화 로직 수행
      prevSideItem.current?.classList.remove('show');
      setTimeout(() => sideItem.current?.classList.add('show'), 250);
    } else {
      // 사이드바 활성화 로직 수행
      sideItem.current?.classList.add('show');
    }
    prevSideItem = sideItem;
  }
};

export { onClickNavItem };
