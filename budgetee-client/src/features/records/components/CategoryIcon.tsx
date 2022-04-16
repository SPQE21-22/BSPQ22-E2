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

type Category = {
  name: RecordCategory;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  color: string;
  background: string;
};

export const categories = [
  { name: 'Other',              icon: MenuIcon,         color: 'text-gray-900',   background: 'bg-gray-100'},
  { name: 'Income',             icon: CashIcon,         color: 'text-yellow-500', background: 'bg-yellow-100'},
  { name: 'Housing',            icon: HomeIcon,         color: 'text-orange-500', background: 'bg-orange-100'},
  { name: 'Clothing',           icon: ShoppingBagIcon,  color: 'text-red-500',    background: 'bg-red-100'},  // TODO use other color
  { name: 'Food & Drinks',      icon: MapIcon,          color: 'text-green-500',  background: 'bg-green-100'},
  { name: 'Entertainment',      icon: FilmIcon,         color: 'text-blue-500',   background: 'bg-blue-100'},
  { name: 'Transportation',     icon: BriefcaseIcon,    color: 'text-slate-900',  background: 'bg-slate-100'},
  { name: 'Financial expenses', icon: CurrencyEuroIcon, color: 'text-red-500',    background: 'bg-red-100'},
] as Category[];

const containerSizes = {
  sm: 'p-2',
  md: 'p-3.5',
};

const iconSizes = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7', 
};

type CategoryProps = {
  category: RecordCategory;
  size?: keyof typeof containerSizes;
};

export const CategoryIcon = ({ category, size = 'md'}: CategoryProps) => {
  const categoryData = categories.find(c => c.name === category);

  if (!categoryData) return null; // TODO find a way to avoid type nullification

  return (
    <div className={`${containerSizes[size]} ${categoryData.background} rounded-full`}>
      <categoryData.icon className={`${iconSizes[size]} ${categoryData.color}`} />
    </div>
  );
};