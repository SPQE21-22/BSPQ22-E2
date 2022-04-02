import React from 'react';

import { ModalBase } from '../../../components/Overlay/ModalBase';

// TODO join with ModalBase.tsx props
type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateBudgetModal = ({ isOpen, setIsOpen }: ModalProps) => {
  return (
    <ModalBase isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>THIS IS A TEST</h1>
    </ModalBase>
  );
};