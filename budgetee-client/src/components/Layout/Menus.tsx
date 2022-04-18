import React from 'react';
import { Link } from 'react-router-dom';
import {
  BellIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  CurrencyEuroIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  LogoutIcon,
  PlusCircleIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Menu, Popover, Transition } from '@headlessui/react';

import user from '../../assets/user.png';
import { Button } from '../Elements/Button';
import { ActionType, useModals } from '../../context/ModalContext';
import { logout } from '../../features/auth/api/logout';
import { useUser } from '../../context/UserContext';

// TODO unify NewMenu and MobileCreateMenu

type NotificationProps = {
  type?: 'check' | 'warn' | 'info';
  title?: string;
  content?: string;
};

const Notification = ({ type = 'info', title = 'Title', content = 'Content' }: NotificationProps) => {
  const icons = {
    check: <CheckCircleIcon className='h-11 w-11 text-green-400' />,
    warn: <ExclamationCircleIcon className='h-11 w-11 text-red-400' />,
    info: <InformationCircleIcon className='h-11 w-11 text-sky-400' />
  };

  const backgrounds = {
    check: 'bg-green-100',
    warn: 'bg-red-100',
    info: 'bg-sky-100'
  }

  return (
    <div className='w-80 sm:w-96 h-20 flex divide-x divide-gray-200 border border-gray-200 rounded-md overflow-hidden shadow'>
      <div className='w-20 flex items-center justify-center'>
        <div className={`p-2.5 rounded-full ${backgrounds[type]}`}>
          {icons[type]}
        </div>
      </div>
      <div className='max-w-[15rem] flex flex-col justify-start p-1.5'>
        <p className='font-medium'>{title}</p>
        <p className='text-sm'>{content}</p>
      </div>
    </div>
  );
};

export const NewMenu = () => {
  const { dispatch } = useModals();

  return (
    <Menu as="div" className="relative inline-block text-left" >
      <Menu.Button as={React.Fragment}>
        <Button size='xs' className='hidden sm:block'>+ New</Button>
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 absolute top-0 right-0 w-72 mt-14 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
          <Menu.Item>
            {({ active }) => (
              <div className='px-3 py-2 cursor-pointer bg-violet-500'>
                <span className='flex items-center justify-between font-semibold text-lg text-white'>
                  Create
                  <button className={`rounded-full p-1 transition-colors ${active ? 'bg-violet-400' : ''}`}>
                    <XIcon className='h-7 w-7' strokeWidth="1" />
                  </button>
                </span>
              </div>
            )}
          </Menu.Item>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active && 'bg-gray-100'} text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={() => dispatch(ActionType.SHOW_NEW_BUDGET)}
                >
                  <div className={`p-2 mr-4 rounded-full ${active ? 'bg-gray-200' : 'bg-gray-100'}`}>
                    <ClipboardListIcon
                      className="w-8 h-8"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    />
                  </div>
                  Create new budget
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active && 'bg-gray-100'} text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={() => dispatch(ActionType.SHOW_NEW_RECORD)}
                >
                  <div className={`p-2 mr-4 rounded-full ${active ? 'bg-gray-200' : 'bg-gray-100'}`}>
                    <CurrencyEuroIcon
                      className="w-8 h-8"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    />
                  </div>
                  Create new record
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const NotificationMenu = () => {
  const testNotifications = [
    { type: 'check', title: 'Notification number 1', content: 'This is the test content number 1. This is the test content number 1.' },
    { type: 'warn', title: 'Notification number 2', content: 'This is the test content number 2.' },
    { type: 'info', title: 'Notification number 3', content: 'This is the test content number 3.' },
    { type: 'check', title: 'Notification number 4', content: 'This is the test content number 4.' },
    { type: 'warn', title: 'Notification number 5', content: 'This is the test content number 5.' },
  ] as NotificationProps[];

  return (
    <Popover as="div" className="relative inline-block text-left" >
      <Popover.Button className="flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors">
        <BellIcon className='h-7 w-7' />
      </Popover.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="z-10 absolute top-0 right-0 mt-14 -mr-16 sm:mr-0 max-h-[500px] overflow-y-auto no-scrollbar overflow-x-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className='text-xl font-medium py-2 px-2.5'>Notifications</div>
          <div className='flex flex-col gap-2 p-2'>
            {/* TODO add margin to scrollbar */}
            {testNotifications.map((notification, i) =>
              <Notification key={i} type={notification.type} title={notification.title} content={notification.content} />
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export const UserMenu = () => {
  const { setUser } = useUser();

  const logoutHandler = async () => {
    await logout();
    setUser(null);
  };

  return (
    <Menu as="div" className="relative inline-block text-left" >
      <Menu.Button className="flex items-center border-2 border-gray-200 rounded-full">
        <img src={user} alt="user" className='h-12 w-12 rounded-full' />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 absolute top-0 right-0 w-56 mt-16 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link to="/profile"
                  className={`${active ? 'bg-gray-200' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <UserIcon
                    className="w-6 h-6 mr-3"
                    aria-hidden="true"
                  />
                  Profile
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-gray-200' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={logoutHandler}
                >
                  <LogoutIcon
                    className="w-6 h-6 mr-3"
                    aria-hidden="true"
                  />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const MobileCreateMenu = () => {
  const { dispatch } = useModals();

  return (
    <Menu>
      <Menu.Button className="flex flex-col items-center w-full">
        <PlusCircleIcon
          strokeWidth="1"
          className="h-11 w-11 text-gray-700 transition-colors"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform translate-y-full"
        enterTo="transform translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="transform translate-y-0"
        leaveTo="transform translate-y-full"
      >
        <Menu.Items className="z-10 absolute bottom-0 w-screen origin-bottom bg-white divide-y divide-gray-100 rounded-t-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
          <Menu.Item>
            {({ active }) => (
              <div className='px-3 py-2 cursor-pointer bg-violet-500'>
                <span className='flex items-center justify-between font-semibold text-lg text-gray-200'>
                  Create new...
                  <button className={`rounded-full p-1 transition-colors ${active ? 'bg-violet-400' : ''}`}>
                    <XIcon className='h-7 w-7' strokeWidth="1" />
                  </button>
                </span>
              </div>
            )}
          </Menu.Item>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active && 'bg-gray-100'} text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={() => dispatch(ActionType.SHOW_NEW_BUDGET)}
                >
                  <div className={`p-2 mr-4 rounded-full ${active ? 'bg-gray-200' : 'bg-gray-100'}`}>
                    <ClipboardListIcon
                      className="w-8 h-8"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    />
                  </div>
                  Create new budget
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active && 'bg-gray-100'} text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={() => dispatch(ActionType.SHOW_NEW_RECORD)}
                >
                  <div className={`p-2 mr-4 rounded-full ${active ? 'bg-gray-200' : 'bg-gray-100'}`}>
                    <CurrencyEuroIcon
                      className="w-8 h-8"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    />
                  </div>
                  Create new record
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};