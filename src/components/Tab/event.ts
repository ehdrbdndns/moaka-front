const onClickTab = (
  openTabElem: React.RefObject<HTMLDivElement>,
  closeTabElem: React.RefObject<HTMLDivElement>,
) => {
  openTabElem.current?.classList.add('active');
  closeTabElem.current?.classList.remove('active');
};

export { onClickTab };
