import { findParentElem } from '../../asset';

const onClickModal = (e: any) => {
  let modalElem = findParentElem('modal', e.target);
  modalElem?.classList.toggle('active');
};

export { onClickModal };
