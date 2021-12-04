export type DropwDownListType = {
  title: string;
  list: {
    index: number; // DB 고유 Index 번호
    value: string; // list rkqt
  }[];
};

export type DropDownProps = {
  defaultValue: string; // 기본 select 값
  value: string; // 선택한 값
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  dropdownList: Array<DropwDownListType>;
};
