import { DropDownProps, DropwDownListType } from '../components/DropDown/type';

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

// TODO 썸네일 기본 이미지
const defaultThumbnailImg = '/img/default-thumbnail.png';

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

// TODO 카테고리 종류
const categoryInfo: DropDownProps = {
  defaultValue: '카테고리 선택',
  dropdownList: [
    {
      title: '카테고리 선택',
      list: [
        {
          no: '개발',
          title: '개발',
        },
        {
          no: '기획',
          title: '기획',
        },
        {
          no: '디자인',
          title: '디자인',
        },
        {
          no: '마케팅',
          title: '마케팅',
        },
        {
          no: '스타트업',
          title: '스타트업',
        },
      ],
    } as DropwDownListType,
  ],
} as DropDownProps;

export {
  findParentElem,
  regEmail,
  regPwd,
  setImgFile,
  regUrl,
  categoryInfo,
  defaultThumbnailImg,
};
