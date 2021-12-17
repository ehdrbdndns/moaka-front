import { RefObject } from 'react';

const toggleModal = (modalElem: RefObject<HTMLDivElement>) => {
  modalElem.current?.classList.toggle('active');
};

const closeModal = (modalElem: RefObject<HTMLDivElement>) => {
  modalElem.current?.classList.remove('active');
};

const closeSubModal = (modalElem: RefObject<HTMLDivElement>) => {
  modalElem.current?.classList.remove('show');
};

const openSubModal = (modalElem: RefObject<HTMLDivElement>) => {
  modalElem.current?.classList.add('show');
};

export { closeModal, toggleModal, closeSubModal, openSubModal };
