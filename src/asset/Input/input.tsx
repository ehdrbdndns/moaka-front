const onFocus = (e: any) => {
  const inputBox = e.target.parentNode.parentNode;
  inputBox.classList.add('focuse');
};

const onBlur = (e: any) => {
  const inputBox = e.target.parentNode.parentNode;
  inputBox.classList.remove('focuse');
};

export { onFocus, onBlur };
