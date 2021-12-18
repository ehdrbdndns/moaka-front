export type ButtonProps = {
  buttonElem: React.RefObject<HTMLDivElement> | null;
  type: string; // button class
  size: string;
  value: string;
  isDisabled: boolean;
  isLoading: boolean;
  isPressed: boolean;
  onClick: () => void;
};
