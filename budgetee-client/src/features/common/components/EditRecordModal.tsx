import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

import { ModalBase } from '../../../components/Overlay/ModalBase';
import { InputField } from '../../../components/Form'
import { SelectField } from '../../../components/Form/SelectField';
import { CategoryListField } from './CategoryListField';
import { Button } from '../../../components/Elements/Button';

import { editRecord } from '../api/editRecord';
import { deleteRecord } from '../api/deleteRecord';
import { ActionType, useModals } from '../../../context/ModalContext';
import { useData } from '../../../context/DataContext';
import { Record } from '../../../types';
import { categories, Category } from '../../records/components/CategoryIcon';

type FormProps = {
  closeModal: () => void;
  baseRecord: Record;
};

type ModalProps = {
  record: Record | null;
};


// TODO export to external file
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

const initialFormData: RecordFormData = {
  name: '',
  category: categories[0],
  value: 0,
  date: '',
  extraInfo: '',
  paymentType: '',
  place: '',
  budgetId: '',
};

// TODO style datepicker
const EditRecordForm = ({ closeModal, baseRecord }: FormProps) => {
  const [formState, setFormState] = React.useState<RecordFormData>(initialFormData);
  const { data, dispatch } = useData();

  const loadDefaultData = () => {
    setFormState({
      name: baseRecord.name,
      category: categories.find(c => c.name === baseRecord.category) ?? categories[0],
      value: baseRecord.value,
      date: baseRecord.date ?? '',
      extraInfo: baseRecord.extraInfo,
      paymentType: baseRecord.paymentType,
      place: baseRecord.place,
      budgetId: baseRecord.budgetId,
    });
  };

  React.useEffect(loadDefaultData, [baseRecord]);

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

  const handleDelete = async () => {
    await deleteRecord(baseRecord.id);
    dispatch({
      type: 'removeRecord',
      payload: baseRecord.id
    });
    closeModal();
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    editRecord(baseRecord.id, { ...formState, category: formState.category.name })
      .then(result => {
        dispatch({
          type: 'editRecord',
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
      <div className='flex flex-col sm:flex-row sm:gap-2'>
        <Button variant='inverseRed' className='mt-2 w-full' onClick={handleDelete}>Delete record</Button>
        <Button type='submit' variant='inverse' className='mt-2 w-full'>Edit record</Button>
      </div>
    </form>
  );
};

export const EditRecordModal = ({ record }: ModalProps) => {
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  if (!record) return null;

  return (
    <ModalBase
      isOpen={modalState.editRecordOpen}
      closeModal={closeModal}
      title='Edit record'
      className='w-full lg:max-w-2xl'
    >
      <EditRecordForm closeModal={closeModal} baseRecord={record} />
    </ModalBase>
  );
};