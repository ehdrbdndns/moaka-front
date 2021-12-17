const onFocus = (e: any) => {
  const inputBox = e.target.parentNode.parentNode;
  inputBox.classList.add('focuse');
};

const onBlur = (e: any) => {
  const inputBox = e.target.parentNode.parentNode;
  inputBox.classList.remove('focuse');
};

const onKeyPressOfEnter = (
  e: React.KeyboardEvent<HTMLInputElement>,
  value: string,
  setValueList: any,
) => {
  if (e.key === 'Enter' && value.trim() !== '') {
    setValueList(value.trim());
  }
};

export { onFocus, onBlur, onKeyPressOfEnter };
