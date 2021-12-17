const onClickTab = (selectId: string, notSelectId: string, type: string) => {
  document.getElementById(selectId)?.classList.add('active');
  document.getElementById(notSelectId)?.classList.remove('active');
};

export { onClickTab };
