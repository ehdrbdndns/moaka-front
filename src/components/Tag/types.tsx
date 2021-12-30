export type TagAProps = {
  basicTagList: Array<string> | undefined;
  tagList: Array<string>;
  setTagList: React.Dispatch<React.SetStateAction<string[]>>;
};

export type TagProps = {
  type: string;
  value: string;
  size: string; // m, l
  onClick: (e: any, value: string) => void;
  isCloseEvent: boolean;
  onClickOfClose: (value: string) => void;
};
