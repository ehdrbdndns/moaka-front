import { RefObject } from 'react';

let prevNavItem: RefObject<HTMLLIElement> | null = null;
let prevSideItem: RefObject<HTMLDivElement> | null = null;

const setInitValueOfNav = (sideItem: RefObject<HTMLDivElement>) => {
  prevNavItem && prevNavItem.current?.classList.remove('active');
  prevNavItem = null;

  prevSideItem?.current?.classList.remove('show');
  prevSideItem = sideItem;
};

const onClickNavItem = (
  sideNavElem: RefObject<HTMLDivElement>,
  sideItem: RefObject<HTMLDivElement>,
  navItem: RefObject<HTMLLIElement>,
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>,
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
    setOpenState(false);
    prevSideItem = null;
  } else {
    // 활성화 로직 수행
    if (prevSideItem !== null) {
      // 전에 활성화 된 사이드 바 닫은 후(.25초) 사이드바 활성화 로직 수행
      prevSideItem.current?.classList.remove('show');
      setOpenState(true);
      setTimeout(() => sideItem.current?.classList.add('show'), 250);
    } else {
      // 사이드바 활성화 로직 수행
      setOpenState(true);
      sideItem.current?.classList.add('show');
    }
    prevSideItem = sideItem;
  }
};

export { onClickNavItem, setInitValueOfNav };
