import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

import { ModalBase } from '../../../components/Overlay/ModalBase';
import { InputField, SelectField } from '../../../components/Form'
import { Button } from '../../../components/Elements/Button';
import { categories, Category } from '../../records/components/CategoryIcon';

import { createRecord } from '../api/createRecord';
import { ActionType, useModals } from '../../../context/ModalContext';
import { useData } from '../../../context/DataContext';
import { CategoryListField } from './CategoryListField';
import { RequestLoadStates } from '../../../types';
import { Spinner } from '../../../components/Elements/Spinner';

type FormProps = {
  closeModal: () => void;
  setRequestState: (state: RequestLoadStates) => void;
};


export type RecordFormData = {
  name: string;
  category: Category;
  value: number;
  date: string;
  extraInfo?: string;
  paymentType?: string;
  place?: string;
  budgetId: string;
};


const CreateRecordForm = ({ closeModal, setRequestState }: FormProps) => {
  const { data, dispatch } = useData();

  const initialFormData: RecordFormData = {
    name: '',
    category: categories[0],
    value: 0,
    date: '',
    extraInfo: '',
    paymentType: '',
    place: '',
    budgetId: data.budgets.length > 0 ? data.budgets[0].id : '',
  };

  const [formState, setFormState] = React.useState<RecordFormData>(initialFormData);

  if (data.budgets.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full my-10'>
        <div className='mb-6 p-4 bg-red-100 rounded-full'>
          <ExclamationCircleIcon className='h-16 w-16 text-rose-400' />
        </div>
        <h3 className='font-medium text-xl'>Please create a budget before creating records!</h3>
      </div>
    );
  }

  const budgets = data.budgets.map(budget => {
    return {
      label: budget.name,
      value: budget.id
    }
  });

  // TODO type checking for initialBudget type
  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleCategoryChange = (category: Category) => {
    setFormState({
      ...formState,
      category: category
    });
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setRequestState('loading');

    createRecord({ ...formState, category: formState.category.name })
      .then(result => {
        dispatch({
          type: 'createRecord',
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
      <div className='flex flex-col items-center justify-center lg:flex-row lg:gap-4'>
        <div className='flex flex-col w-full'>
          <InputField
            label='Name'
            name='name'
            value={formState.name}
            required
            onChange={handleInputChange}
            className='mb-2'
          />
          <CategoryListField
            categoryList={categories}
            label='Category'
            value={formState.category}
            setValue={handleCategoryChange}
            className='mb-2'
          />
          <InputField
            label='Value'
            name='value'
            value={formState.value}
            type='number'
            required
            onChange={handleInputChange}
            className='mb-2'
          />
          <SelectField
            label='Budget'
            name='budgetId'
            options={budgets}
            value={formState.budgetId}
            onChange={handleInputChange}
            className='mb-2'
          />
        </div>
        <div className='flex flex-col w-full'>
          <InputField
            label='Date'
            name='date'
            value={formState.date}
            type='date'
            onChange={handleInputChange}
            className='mb-2'
          />
          <InputField
            label='Extra information'
            name='extraInfo'
            value={formState.extraInfo}
            onChange={handleInputChange}
            className='mb-2'
          />
          {/* TODO use <select> */}
          <InputField
            label='Payment type'
            name='paymentType'
            value={formState.paymentType}
            onChange={handleInputChange}
            className='mb-2'
          />
          <InputField
            label='Place'
            name='place'
            value={formState.place}
            onChange={handleInputChange}
            className='mb-2'
          />
        </div>
      </div>
      <Button type='submit' variant='inverse' className='mt-2'>Create record</Button>
    </form>
  );
};

export const CreateRecordModal = () => {
  const [requestState, setRequestState] = React.useState<RequestLoadStates>('unloaded');
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  const getContent = () => {
    switch (requestState) {
      case 'unloaded':
        return <CreateRecordForm closeModal={closeModal} setRequestState={setRequestState} />
      case 'loading':
        return (
          <div className='flex items-center justify-center my-36'>
            <Spinner size='lg' />
          </div>
        );
      case 'failure':
        return (
          <div className='flex flex-col items-center justify-center my-24'>
            <div className='mb-6 p-4 bg-red-100 rounded-full'>
              <ExclamationCircleIcon className='h-16 w-16 text-rose-400' />
            </div>
            <h3 className='font-medium text-xl max-w-md text-center'>There was an error creating your record. Please try again later!</h3>
          </div>
        );
    };
  };

  return (
    <ModalBase
      isOpen={modalState.newRecordOpen}
      closeModal={() => {
        closeModal();
        setTimeout(() => setRequestState('unloaded'), 1000);
      }}
      title='Create record'
      className='w-full lg:max-w-2xl'
    >
      {getContent()}
    </ModalBase>
  );
};