export type DropwDownListType = {
  title: string;
  list: {
    no: number | string; // DB 고유 Index 번호 or 실제 값
    title: string; // list title
  }[];
};

export type DropDownProps = {
  defaultValue: string; // 기본 select 값
  setValue: React.Dispatch<React.SetStateAction<number | string>>;
  dropdownList: Array<DropwDownListType>;
  error: string;
};
