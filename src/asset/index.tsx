// TODO 이메일 정규식
const regEmail =
  // eslint-disable-next-line no-useless-escape
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// TODO ParentElem이 있으면 HTMLElement 반환 없으면 null 반환
const findParentElem = (
  parentName: string,
  elem: HTMLElement,
): HTMLElement | null => {
  let parentElem: HTMLElement | null = elem;
  while (parentElem && !parentElem.classList.contains(parentName)) {
    if (parentElem.classList.contains('body')) {
      parentElem = null;
      break;
    } else {
      parentElem = parentElem.parentNode as HTMLElement;
    }
  }
  return parentElem;
};

export { findParentElem, regEmail };
