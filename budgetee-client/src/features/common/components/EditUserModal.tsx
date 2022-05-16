import React from 'react';

import { ModalBase } from '../../../components/Overlay/ModalBase';
import { InputField } from '../../../components/Form'
import { Button } from '../../../components/Elements/Button';

import { ActionType, useModals } from '../../../context/ModalContext';
import { User } from '../../../types';
import { editUser } from '../api/editUser';
import { useUser } from '../../../context/UserContext';
import { deleteUser } from '../api/deleteUser';
import { Spinner } from '../../../components/Elements/Spinner';
import { ExclamationIcon } from '@heroicons/react/solid';


type ModalState = 'initial' | 'loading' | 'confirm';

type FormProps = {
  closeModal: () => void;
  baseUser: User;
  setDisplayState: (state: ModalState) => void;
};

export type UserFormData = {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
};

const initialFormData: UserFormData = {
  username: '',
  password: '',
  name: '',
  email: '',
  birthDate: '',
};

const EditUserForm = ({ closeModal, baseUser, setDisplayState }: FormProps) => {
  const [formState, setFormState] = React.useState<UserFormData>(initialFormData);
  const { setUser } = useUser();

  const loadDefaultData = () => {
    setFormState({
      username: baseUser.username,
      password: '',
      name: baseUser.name,
      email: baseUser.email,
      birthDate: baseUser.birthDate,
    });
  };

  React.useEffect(loadDefaultData, [baseUser]);

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

    setDisplayState('loading');

    editUser(formState)
      .then(result => {
        setUser(result);
        closeModal();
        setTimeout(() => setDisplayState('initial'), 1000);
        // TODO notify creation, etc
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => setDisplayState('initial'), 1000);
        // TODO notify error
      });
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <InputField
        label='Username'
        name='username'
        value={formState.username}
        required
        onChange={handleInputChange}
        className='mb-4'
      />
      <InputField
        label='Password'
        name='password'
        value={formState.password}
        onChange={handleInputChange}
        className='mb-4'
        type='password'
      />
      <InputField
        label='Name'
        name='name'
        value={formState.name}
        required
        onChange={handleInputChange}
        className='mb-4'
      />
      <InputField
        label='Email'
        type='email'
        name='email'
        value={formState.email}
        onChange={handleInputChange}
        className='mb-4'
      />
      <InputField
        label='Birthdate'
        type='date'
        name='birdthDate'
        value={formState.birthDate}
        required
        onChange={handleInputChange}
        className='mb-4'
      />
      <div className='flex flex-col sm:flex-row sm:gap-2'>
        <Button variant='inverseRed' className='mt-2 w-full' onClick={() => setDisplayState('confirm')}>Delete user</Button>
        <Button type='submit' variant='inverse' className='mt-2 w-full'>Edit user</Button>
      </div>
    </form>
  );
};

export const EditUserModal = () => {
  const [displayState, setDisplayState] = React.useState<ModalState>('initial');
  const { user, setUser } = useUser();
  const { modalState, dispatch } = useModals();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  const handleUserDelete = async () => {
    setDisplayState('loading');
    await deleteUser();
    setUser(null);
    closeModal();
    setTimeout(() => setDisplayState('initial'), 1000);
  };

  if (!user) return null;

  const getContent = () => {
    switch (displayState) {
      case 'initial':
        return <EditUserForm closeModal={closeModal} baseUser={user} setDisplayState={setDisplayState} />;
      case 'loading':
        return (
          <div className='flex items-center justify-center my-48'>
            <Spinner size='xl' />;
          </div>
        )
      case 'confirm':
        return (
          <div className='flex flex-col items-center justify-center'>
            <div className="mb-3 flex flex-col items-center justify-center gap-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-violet-200 sm:mx-0 sm:h-16 sm:w-16">
                <ExclamationIcon className="h-10 w-10 text-red-600" aria-hidden="true" />
              </div>
              <p className='text-md text-center'>
                Are you sure you want to delete your account? This action is irreversible.
              </p>
            </div>
            <div className="w-full px-4 py-3 flex flex-col sm:flex-row gap-4">
              <Button variant='inverseBlack' className='flex-1' onClick={() => setDisplayState('initial')}>Cancel</Button>
              <Button variant='primaryRed' className='flex-1' onClick={handleUserDelete}>Delete account</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <ModalBase isOpen={modalState.editUserOpen} closeModal={closeModal} title='Edit user'>
      {getContent()}
    </ModalBase>
  );
};