let prevLinkId: string = '';

const onClickLink = (e: any) => {
  let target = e.target;

  // 최상위 link element 값 찾기
  let parent;
  while (true) {
    parent = target.parentNode;
    if (parent.classList.contains('link')) {
      break;
    } else {
      target = parent;
    }
  }

  // 다른 link의 active class 제거
  document.getElementById(prevLinkId)?.classList.remove('active');

  // 현재 link의 active class 추가
  prevLinkId = parent.getAttribute('id');
  parent.classList.add('active');
};

export { onClickLink };
