import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ClipboardListIcon,
  CurrencyEuroIcon,
  HomeIcon, // or TemplateIcon, TableIcon
  PlusCircleIcon,
  TrendingUpIcon, // or ChartBarIcon, ChartPieIcon, ChartSquareBarIcon, DocumentReportIcon
  XIcon,
} from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';

type NavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;  // TODO wtf is this
}

const navigation = [
  { name: 'Dashboard', to: '.', icon: HomeIcon },
  { name: 'Budgets', to: './budgets', icon: ClipboardListIcon },
  { name: 'Records', to: './records', icon: CurrencyEuroIcon },
  { name: 'Analytics', to: './analytics', icon: TrendingUpIcon },
] as NavigationItem[];

const TopNavigation = () => {
  
};

const MobileCreateMenu = ({ item }: { item: NavigationItem }) => {
  return (
    <Menu>
      <Menu.Button className="group flex flex-col items-center text-xs w-full">
        <item.icon
          strokeWidth="1"
          className="h-11 w-11 text-gray-700 group-hover:text-gray-500 transition-colors"
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
        <Menu.Items className="absolute bottom-0 w-screen origin-bottom bg-white divide-y divide-gray-100 rounded-t-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div className='px-3 py-2 cursor-pointer'>
                <span className='flex items-center justify-between font-semibold text-lg'>
                  Create
                  <button className={`rounded-full p-1 transition-colors ${active ? 'bg-gray-200' : ''}`}>
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
}

const MobileNavigation = () => {
  const navigation = [
    { name: 'Dashboard', to: '.', icon: HomeIcon },
    { name: 'Budgets', to: './budgets', icon: ClipboardListIcon },
    { name: 'CreateNew', to: '.', icon: PlusCircleIcon },
    { name: 'Records', to: './records', icon: CurrencyEuroIcon },
    { name: 'Analytics', to: './analytics', icon: TrendingUpIcon },
  ] as NavigationItem[];

  return (
    <>
      {navigation.map((item, index) => {
        return index === 2 ?
          (
            <MobileCreateMenu key={index} item={item} />
          ) :
          (
            <NavLink
              end={index === 0}
              key={item.name}
              to={item.to}
              className="group flex flex-col items-center text-xs w-full"
            // activeClassName="" // TODO check error here
            >
              <item.icon
                className="h-6 w-6 text-gray-700 group-hover:text-gray-500 transition-colors"
                aria-hidden="true"
              />
              <span className="group-hover:text-gray-500 transition-colors">{item.name}</span>
            </NavLink>
          )

      })}
    </>
  );
};

const Topbar = () => {

};

const MobileBottombar = () => {
  return (
    <div className='w-screen sm:hidden absolute bottom-0 h-14 shadow bg-gray-50 flex items-center justify-around'>
      <MobileNavigation />
    </div>
  );
};

const Logo = () => {

}

type MainLayoutProps = {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='h-screen flex overflow-hidden bg-gray-200'>
      <MobileBottombar />
      {children}
    </div>
  );
}