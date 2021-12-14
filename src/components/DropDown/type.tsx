export type DropwDownListType = {
  title: string;
  list: {
    no: number; // DB 고유 Index 번호
    title: string; // list title
  }[];
};

export type DropDownProps = {
  defaultValue: string; // 기본 select 값
  setValue: React.Dispatch<React.SetStateAction<number>>;
  dropdownList: Array<DropwDownListType>;
};
