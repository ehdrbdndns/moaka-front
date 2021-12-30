const addPressButton = (buttonElem: React.RefObject<HTMLDivElement>) => {
  buttonElem.current?.classList.toggle('pressed');
};

export { addPressButton };
