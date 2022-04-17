import React from 'react';
import {
  BriefcaseIcon,
  CashIcon,
  CurrencyEuroIcon,
  FilmIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  ShoppingBagIcon
} from '@heroicons/react/solid';

import { RecordCategory } from '../../../types';

export type Category = {
  name: RecordCategory;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  color?: string;
  background?: string;
};

export const categories = [
  { name: 'Clothing',           icon: ShoppingBagIcon,  color: 'text-indigo-500',    background: 'bg-indigo-100'},
  { name: 'Food & Drinks',      icon: MapIcon,          color: 'text-green-500',  background: 'bg-green-100'},
  { name: 'Entertainment',      icon: FilmIcon,         color: 'text-blue-500',   background: 'bg-blue-100'},
  { name: 'Housing',            icon: HomeIcon,         color: 'text-orange-500', background: 'bg-orange-100'},
  { name: 'Transportation',     icon: BriefcaseIcon,    color: 'text-slate-900',  background: 'bg-slate-100'},
  { name: 'Income',             icon: CashIcon,         color: 'text-yellow-500', background: 'bg-yellow-100'},
  { name: 'Financial expenses', icon: CurrencyEuroIcon, color: 'text-red-500',    background: 'bg-red-100'},
  { name: 'Other',              icon: MenuIcon,         color: 'text-gray-900',   background: 'bg-gray-100'},
] as Category[];

const containerSizes = {
  xs: 'p-1.5',
  sm: 'p-2',
  md: 'p-3.5',
  lg: 'p-4',
};

const iconSizes = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
  lg: 'h-9 w-9',
};

type CategoryProps = {
  category?: Category;
  size?: keyof typeof containerSizes;
  className?: string;
};

export const CategoryIcon = ({ category, size = 'md', className }: CategoryProps) => {
  if (!category) return null;

  return (
    <div className={`rounded-full ${className} ${containerSizes[size]} ${category.background}`}>
      <category.icon className={`${iconSizes[size]} ${category.color}`} />
    </div>
  );
};