import { RefObject } from 'react';

const toggleModal = (modalElem: RefObject<HTMLDivElement>) => {
  modalElem.current?.classList.toggle('active');
};

const closeModal = (modalElem: RefObject<HTMLDivElement>) => {
  modalElem.current?.classList.remove('active');
};

export { closeModal, toggleModal };
