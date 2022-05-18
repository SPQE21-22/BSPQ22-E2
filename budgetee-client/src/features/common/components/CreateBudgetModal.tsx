import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

import { InputField } from '../../../components/Form'
import { ModalBase } from '../../../components/Overlay/ModalBase';
import { Spinner } from '../../../components/Elements/Spinner';
import { Button } from '../../../components/Elements/Button';

import { RequestLoadStates } from '../../../types';
import { ActionType, useModals } from '../../../context/ModalContext';
import { useData } from '../../../context/DataContext';
import { useUser } from '../../../context/UserContext';
import { createBudget } from '../api/createBudget';

type FormProps = {
  closeModal: () => void;
  setRequestState: (state: RequestLoadStates) => void;
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


const CreateBudgetForm = ({ closeModal, setRequestState }: FormProps) => {
  const [formState, setFormState] = React.useState<BudgetFormData>(initialFormData);
  const { dispatch } = useData();
  const { user } = useUser();

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
    setRequestState('loading');

    createBudget({ ...formState, userId: user?.id ?? '' })
      .then(result => {
        dispatch({
          type: 'createBudget',
          payload: result
        });
        closeModal();
        setTimeout(() => setRequestState('unloaded'), 1000);
        // TODO notify creation, etc
      })
      .catch(err => {
        console.log(err);
        setRequestState('failure');
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
      <Button type='submit' variant='inverse' className='mt-2'>Create budget</Button>
    </form>
  );
};

export const CreateBudgetModal = () => {
  const [requestState, setRequestState] = React.useState<RequestLoadStates>('unloaded');
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  const getContent = () => {
    switch (requestState) {
      case 'unloaded':
        return <CreateBudgetForm closeModal={closeModal} setRequestState={setRequestState} />;
      case 'loading':
        return (
          <div className='flex items-center justify-center my-48'>
            <Spinner size='lg' />
          </div>
        );
      case 'failure':
        return (
          <div className='flex flex-col items-center justify-center my-36'>
            <div className='mb-6 p-4 bg-red-100 rounded-full'>
              <ExclamationCircleIcon className='h-16 w-16 text-rose-400' />
            </div>
            <h3 className='font-medium text-xl'>There was an error creating your budget.</h3>
          </div>
        );
    };
  };

  return (
    <ModalBase
      isOpen={modalState.newBudgetOpen}
      closeModal={() => {
        closeModal();
        setTimeout(() => setRequestState('unloaded'), 1000);
      }}
      title='Create budget'
    >
      {getContent()}
    </ModalBase>
  );
};