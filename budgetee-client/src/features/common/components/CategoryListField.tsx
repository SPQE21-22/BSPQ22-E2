import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Category, CategoryIcon } from '../../records/components/CategoryIcon';

const classNames = (...classes: (string | null | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

type ListFieldProps = {
  categoryList: Category[];
  label: string;
  value: Category;
  setValue: (value: Category) => void;
  className: string;
};

export const CategoryListField = ({ categoryList, label, value, setValue, className }: ListFieldProps) => {
  return (
    <Listbox value={value} onChange={setValue}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className={`relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1.5 lg:py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}>
              <span className="flex items-center">
                <CategoryIcon category={value} size='xs' />
                <span className="ml-3 block truncate">{value.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full bg-white shadow-lg max-h-48 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {categoryList.map((category) => (
                  <Listbox.Option
                    key={category.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <CategoryIcon category={category} size='xs' />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {category.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}