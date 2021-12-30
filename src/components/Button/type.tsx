export type ButtonProps = {
  buttonElem: React.RefObject<HTMLDivElement> | null; // 생략 가능
  width: number; // 생략 가능 -> width: 100%;
  type: string; // button class
  size: string;
  value: string;
  isDisabled: boolean;
  isLoading: boolean;
  isPressed: boolean;
  onClick: () => void;
};
