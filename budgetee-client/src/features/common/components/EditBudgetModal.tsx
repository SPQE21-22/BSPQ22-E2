import React from 'react';

import { ModalBase } from '../../../components/Overlay/ModalBase';
import { InputField } from '../../../components/Form'
import { Button } from '../../../components/Elements/Button';

import { editBudget } from '../api/editBudget';
import { deleteBudget } from '../api/deleteBudget';
import { ActionType, useModals } from '../../../context/ModalContext';
import { useData } from '../../../context/DataContext';
import { Budget } from '../../../types';

type FormProps = {
  closeModal: () => void;
  baseBudget: Budget;
};

type ModalProps = {
  budget: Budget | null;
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

const EditBudgetForm = ({ closeModal, baseBudget }: FormProps) => {
  const [formState, setFormState] = React.useState<BudgetFormData>(initialFormData);
  const { dispatch } = useData();

  const loadDefaultData = () => {
    setFormState({
      name: baseBudget.name,
      description: baseBudget.description,
      startDate: baseBudget.startDate,
      endDate: baseBudget.endDate,
      initialBudget: baseBudget.initialBudget
    });
  };

  React.useEffect(loadDefaultData, [baseBudget]);

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

  const handleDelete = async () => {
    await deleteBudget(baseBudget.id);
    dispatch({
      type: 'removeBudget',
      payload: baseBudget.id
    });
    closeModal();
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    editBudget(baseBudget.id, formState)
      .then(result => {
        dispatch({
          type: 'editBudget',
          payload: result
        });
        closeModal();
        // TODO notify creation, etc
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
        required
        onChange={handleInputChange}
        className='mb-4'
      />
      <InputField
        label='Description'
        name='description'
        value={formState.description}
        onChange={handleInputChange}
        className='mb-4'
      />
      <InputField
        label='Start date'
        type='date'
        name='startDate'
        value={formState.startDate}
        required
        onChange={handleInputChange}
        className='mb-4'
      />
      <InputField
        label='End date'
        type='date'
        name='endDate'
        value={formState.endDate}
        required
        onChange={handleInputChange}
        className='mb-4'
      />
      <InputField
        label='Initial budget'
        type='number'
        name='initialBudget'
        value={formState.initialBudget}
        onChange={handleInputChange}
        className='mb-4'
      />
      <div className='flex flex-col sm:flex-row sm:gap-2'>
        <Button variant='inverseRed' className='mt-2 w-full' onClick={handleDelete}>Delete budget</Button>
        <Button type='submit' variant='inverse' className='mt-2 w-full'>Edit budget</Button>
      </div>
    </form>
  );
};

export const EditBudgetModal = ({ budget }: ModalProps) => {
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  if (!budget) return null;

  return (
    <ModalBase isOpen={modalState.editBudgetOpen} closeModal={closeModal} title='Edit budget'>
      <EditBudgetForm closeModal={closeModal} baseBudget={budget} />
    </ModalBase>
  );
};