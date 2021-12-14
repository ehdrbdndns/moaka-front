export type ButtonProps = {
  type: string; // button class
  value: string;
  isDisabled: boolean;
  isPressed: boolean;
  onClick: () => void;
};
