export type ButtonProps = {
  buttonElem: React.RefObject<HTMLDivElement> | null; // 생략 가능
  width: number; // 생략 가능 -> width: 100%;
  type: string; // primary or outline or outline-text or text
  size: string; // s or m
  value: string; // 버튼에 들어가는 텍스트
  isDisabled: boolean;
  isLoading: boolean;
  isPressed: boolean;
  onClick: () => void;
};
