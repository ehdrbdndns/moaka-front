export type InputProps = {
  prefix: string;
  suffix: string;
  value: string;
  setValue: (value: string) => void;
  onKeyPressOfEnter: (value: string) => void;
  error: string;
  placeholder: string;
};
