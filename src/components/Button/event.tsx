const addPressButton = (buttonElem: React.RefObject<HTMLDivElement>) => {
  buttonElem.current?.classList.add('pressed');
};

export { addPressButton };
