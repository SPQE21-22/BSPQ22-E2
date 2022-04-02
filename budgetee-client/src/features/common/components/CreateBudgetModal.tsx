import React from 'react';

import { ModalBase } from '../../../components/Overlay/ModalBase';
import { InputField } from '../../../components/Form'
import { Button } from '../../../components/Elements/Button';
import { createBudget } from '../api/createBudget';
import { ActionType, useModals } from '../../../context/ModalContext';

type FormProps = {
  closeModal: () => void;
};

// TODO export to external file
export type BudgetFormData = {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  initialBudget: number;
};

const initialFormData: BudgetFormData = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  initialBudget: 0,
};

// TODO style datepicker
const CreateBudgetForm = ({ closeModal }: FormProps) => {
  const [formState, setFormState] = React.useState<BudgetFormData>(initialFormData);

  // TODO type checking for initialBudget type
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    
    createBudget(formState)
      .then(result => {
        console.log(result);
        closeModal();
        // TODO add to state, notify creation, etc
      })
      .catch(err => {
        console.log(err);
        // TODO notify error
      });
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <InputField
        label='Name'
        name='name'
        value={formState.name}
        onChange={handleInputChange}
        className='mb-2'
      />
      <InputField
        label='Description'
        name='description'
        value={formState.description}
        onChange={handleInputChange}
        className='mb-2'
        />
      <InputField
        label='Start date'
        type='date'
        name='startDate'
        value={formState.startDate}
        onChange={handleInputChange}
        className='mb-2'
      />
      <InputField
        label='End date'
        type='date'
        name='endDate'
        value={formState.endDate}
        onChange={handleInputChange}
        className='mb-2'
      />
      <InputField
        label='Initial budget'
        type='number'
        name='initialBudget'
        value={formState.initialBudget}
        onChange={handleInputChange}
        className='mb-2'
      />
      <Button type='submit' variant='inverse' className='mt-2'>Create budget</Button>
    </form>
  );
};

export const CreateBudgetModal = () => {
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  return (
    <ModalBase isOpen={modalState.newBudgetOpen} closeModal={closeModal} title='Create budget'>
      <CreateBudgetForm closeModal={closeModal} />
    </ModalBase>
  );
};