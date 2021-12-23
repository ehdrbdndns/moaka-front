export type InputProps = {
  prefix: string;
  suffix: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
  onKeyPress: (value: any) => void;
  onBlur: (value: any) => void;
  onClickOfSuffix: () => void;
  disabled: boolean;
  error: string;
  placeholder: string;
  tabindex: number;
};
