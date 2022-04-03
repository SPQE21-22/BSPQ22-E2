import React from 'react';

import { ModalBase } from '../../../components/Overlay/ModalBase';
import { InputField } from '../../../components/Form'
import { Button } from '../../../components/Elements/Button';
import { createRecord } from '../api/createRecord';
import { ActionType, useModals } from '../../../context/ModalContext';
import { useData } from '../../../context/DataContext';
import { SelectField } from '../../../components/Form/SelectField';

type FormProps = {
  closeModal: () => void;
};

// TODO export to external file
export type RecordFormData = {
  name: string;
  category: string;
  value: number;
  date: string;
  extraInfo?: string;
  paymentType?: string;
  place?: string;
  budgetId: string;
};

// TODO style datepicker
const CreateRecordForm = ({ closeModal }: FormProps) => {
  const { data, dispatch } = useData();

  const initialFormData: RecordFormData = {
    name: '',
    category: '',
    value: 0,
    date: '',
    extraInfo: '',
    paymentType: '',
    place: '',
    budgetId: data.budgets[0].id,
  };

  const [formState, setFormState] = React.useState<RecordFormData>(initialFormData);

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

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    createRecord(formState)
      .then(result => {
        dispatch({
          type: 'createRecord',
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
          {/* TODO use <select> */}
          <InputField
            label='Category'
            name='category'
            value={formState.category}
            required
            onChange={handleInputChange}
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
            type='datetime-local'
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
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  return (
    <ModalBase
      isOpen={modalState.newRecordOpen}
      closeModal={closeModal}
      title='Create record'
      className='w-full lg:max-w-2xl'
    >
      <CreateRecordForm closeModal={closeModal} />
    </ModalBase>
  );
};