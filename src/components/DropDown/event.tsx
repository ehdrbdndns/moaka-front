const onClickDropdown = (dropdownElem: React.RefObject<HTMLDivElement>) => {
  dropdownElem.current?.classList.toggle('active');
};

const selectDropdownItem = (
  value: number,
  title: string,
  setValue: any,
  dropdownElem: React.RefObject<HTMLDivElement>,
  dropdownStateElem: React.RefObject<HTMLSpanElement>,
) => {
  (dropdownStateElem.current as HTMLElement).innerHTML = title;
  setValue(value);
  dropdownElem.current?.classList.remove('active');
};

export { onClickDropdown, selectDropdownItem };
