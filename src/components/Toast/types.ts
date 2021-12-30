export type ToastProps = {
  type: string; // Default or Error or Warning or Success or Notification
  message: string;
  showType: string; // normal -> 포지션 위치 변동 x, fixed -> 포지션 위치 변동 0
  toastElem: React.RefObject<HTMLDivElement>;
  isFirstButton: boolean;
  firstButtonValue: string;
  isSecondButton: boolean;
  secondButtonValue: string;
  onClickFirstButtonEvent: () => void;
  onClickSecondButtonEvent: () => void;
  top: number; // taost 위치 값 설정
};
