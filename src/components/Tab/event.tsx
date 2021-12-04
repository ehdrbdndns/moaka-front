const onClickTab = (
  selectId: string,
  notSelectId: string,
  type: string,
  mode: React.MutableRefObject<boolean>,
) => {
  document.getElementById(selectId)?.classList.add('active');
  document.getElementById(notSelectId)?.classList.remove('active');

  if (type === 'first') {
    mode.current = false;
  } else {
    mode.current = true;
  }
};

export { onClickTab };
