import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

import { categories } from '../../records/components/CategoryIcon';

import { useData } from '../../../context/DataContext';
import { AnalyticsWidget } from '../components/AnalyticsWidget';

/**
 * CHARTS TO SHOW
 * [       BAR       ] [ PIE ]
 * [ PIE ] [      LINE       ]
 * 
 * https://react-chartjs-2.js.org/components/bar/
 * https://react-chartjs-2.js.org/components/line/
 * https://react-chartjs-2.js.org/components/pie/
 * 
 * https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
 * 
 */

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
);


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const barData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * (1000))),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * (1000))),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

const pieData = {
  labels: categories.map(c => c.name),
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ]
};

const lineData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * (1000))),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * (1000))),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const Analytics = () => {
  const { data } = useData();

  return (
    <>
      <div className="p-2 h-full flex flex-col items-center gap-2 lg:grid lg:grid-rows-2">
        <div className="w-full flex flex-col items-center justify-center lg:row-span-1 lg:grid lg:grid-cols-3 gap-2 lg:gap-4">
          <AnalyticsWidget title='Bar chart' className='col-span-2'>
            <Bar options={barOptions} data={barData} />
          </AnalyticsWidget>
          <AnalyticsWidget title='Pie chart' className='col-span-1' containerClassName='h-5/6'>
            <Pie options={barOptions} data={pieData} />
          </AnalyticsWidget>
        </div>
        <div className="w-full flex flex-col items-center justify-center lg:row-span-1 lg:grid lg:grid-cols-3 gap-2 lg:gap-4">
          <AnalyticsWidget title='Pie chart' className='col-span-1' containerClassName='h-5/6'>
            <Pie options={barOptions} data={pieData} />
          </AnalyticsWidget>
          <AnalyticsWidget title='Line chart' className='col-span-2'>
            <Line options={barOptions} data={lineData} />
          </AnalyticsWidget>
        </div>
      </div>
    </>
  );
};