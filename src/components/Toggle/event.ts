const onClickToggle = (
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
) => {
  switch (state) {
    case 'on':
      setState('off');
      break;
    case 'off':
      setState('on');
      break;
    default:
      break;
  }
};

export { onClickToggle };
