// TODO 이메일 정규식
const regEmail =
  // eslint-disable-next-line no-useless-escape
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// TODO 비밀번호 정규식
const regPwd =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// TODO URL 정규식
const regUrl =
  // eslint-disable-next-line no-useless-escape
  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

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

export { findParentElem, regEmail, regPwd, setImgFile, regUrl };
