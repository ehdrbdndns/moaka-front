const onClickIcon = (e: any) => {
  const icon = e.target.parentNode;
  if (icon.classList.contains('active')) {
    // delete icon active
    icon.classList.remove('active');
    e.target.src = '/img/svg/heart.svg';

    let iconValueElem = document.getElementById(icon.dataset.id) as HTMLElement;
    let value = Number(iconValueElem?.innerHTML) - 1;
    iconValueElem.innerHTML = value + '';
  } else {
    // add icon active
    icon.classList.add('active');
    e.target.src = '/img/svg/heart-active.svg';

    let iconValueElem = document.getElementById(icon.dataset.id) as HTMLElement;
    let value = Number(iconValueElem?.innerHTML) + 1;
    iconValueElem.innerHTML = value + '';
  }
};

export { onClickIcon };
