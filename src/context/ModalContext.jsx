// ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';
import Modal from '../components/ui/Modal';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: null,
    submitLbl: '',
    onSubmit: null,
    footer: false,
  });

  const openModal = ({ title, content, submitLbl, onSubmit, footer }) => {
    setModalState({ isOpen: true, title, content, submitLbl, onSubmit, footer });
  };

  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        isOpen={modalState.isOpen}
        title={modalState.title}
        onClose={closeModal}
        submitLbl={modalState.submitLbl}
        onSubmit={modalState.onSubmit}
        footer={modalState.footer}
      >
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  );
};
