const changeLinkType = (
  type: string,
  setType: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (type === 'listview') {
    setType('imageview');
  } else {
    setType('listview');
  }
};

export { changeLinkType };
