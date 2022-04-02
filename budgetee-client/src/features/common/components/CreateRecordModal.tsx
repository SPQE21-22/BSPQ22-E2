import React from 'react';

import { ModalBase } from '../../../components/Overlay/ModalBase';
import { InputField } from '../../../components/Form'
import { Button } from '../../../components/Elements/Button';
import { createRecord } from '../api/createRecord';
import { ActionType, useModals } from '../../../context/ModalContext';

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
  budgetId: number;
};

const initialFormData: RecordFormData = {
  name: '',
  category: '',
  value: 0,
  date: '',
  extraInfo: '',
  paymentType: '',
  place: '',
  budgetId: 0,
};

// TODO style datepicker
const CreateRecordForm = ({ closeModal }: FormProps) => {
  const [formState, setFormState] = React.useState<RecordFormData>(initialFormData);

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
    
    createRecord(formState)
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
      {/* TODO use <select>? */}
      <InputField
        label='Payment type'
        name='extraInfo'
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
      <Button type='submit' variant='inverse' className='mt-2'>Create record</Button>
    </form>
  );
};

export const CreateRecordModal = () => {
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  return (
    <ModalBase isOpen={modalState.newRecordOpen} closeModal={closeModal} title='Create record'>
      <CreateRecordForm closeModal={closeModal} />
    </ModalBase>
  );
};