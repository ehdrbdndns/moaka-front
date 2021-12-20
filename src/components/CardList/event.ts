const toggleCardList = (cardElem: React.RefObject<HTMLDivElement>) => {
  cardElem.current?.classList.toggle('show');
};

export { toggleCardList };
