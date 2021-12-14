const addButton = (buttonElem: React.RefObject<HTMLDivElement>) => {
  buttonElem.current?.classList.add('pressed');
};

export { addButton };
