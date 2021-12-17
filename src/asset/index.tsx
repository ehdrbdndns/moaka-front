// TODO 이메일 정규식
const regEmail =
  // eslint-disable-next-line no-useless-escape
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// TODO 비밀번호 정규식
const regPwd =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// TODO Img File 추출
const setImgFile = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImgSrc: (src: string) => void,
  setImgFile: (file: File) => void,
) => {
  const reader = new FileReader();

  reader.onload = () => {
    setImgSrc(reader.result + '');
  };

  const file = e.target.files && e.target.files[0];

  if (file && file.type.includes('image')) {
    reader.readAsDataURL(file);
    setImgFile(file);
    return true;
  } else {
    return false;
  }
};

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

export { findParentElem, regEmail, regPwd, setImgFile };
