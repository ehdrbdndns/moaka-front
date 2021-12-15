import { RefObject } from 'react';

let prevNavItem: RefObject<HTMLLIElement>;
let prevSideItem: RefObject<HTMLDivElement>;

const onClickNavItem = (
  sideItem: RefObject<HTMLDivElement>,
  navItem: RefObject<HTMLLIElement>,
) => {
  // sidebar
  if (sideItem.current?.classList.contains('show')) {
    // 비활성화 로직 수행
    sideItem.current?.classList.remove('show');
  } else {
    // 전에 활성화 된 사이드 바 닫기
    prevSideItem && prevSideItem.current?.classList.remove('show');
    prevSideItem = sideItem;

    // 활성화 로직 수행
    sideItem.current?.classList.add('show');
  }

  // navigation
  if (navItem.current?.classList.contains('active')) {
    // 비활성화 로직 수행
    navItem.current?.classList.remove('active');
  } else {
    // 전에 활성화 된 네비게이션 끄기
    prevNavItem && prevNavItem.current?.classList.remove('active');
    prevNavItem = navItem;

    // 활성화 로직 수행
    navItem.current?.classList.add('active');
  }
};

export { onClickNavItem };
