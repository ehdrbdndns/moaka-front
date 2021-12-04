const toggleButton = (
  buttonElem: React.RefObject<HTMLDivElement>,
  isDisabled: boolean,
) => {
  if (!isDisabled) {
    buttonElem.current?.classList.toggle('pressed');
  }
};

export { toggleButton };
