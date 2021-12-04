const onClickDropdown = (dropdownElem: React.RefObject<HTMLDivElement>) => {
  dropdownElem.current?.classList.toggle('active');
};

const selectDropdownItem = (
  value: string,
  setValue: any,
  dropdownElem: React.RefObject<HTMLDivElement>,
  dropdownStateElem: React.RefObject<HTMLSpanElement>,
) => {
  (dropdownStateElem.current as HTMLElement).innerHTML = value;
  setValue(value);
  dropdownElem.current?.classList.remove('active');
};

export { onClickDropdown, selectDropdownItem };
