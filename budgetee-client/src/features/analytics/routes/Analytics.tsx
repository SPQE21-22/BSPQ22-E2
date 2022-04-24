import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { categories } from '../../records/components/CategoryIcon';

import { useData } from '../../../context/DataContext';

/**
 * CHARTS TO SHOW
 * [       BAR       ] [ PIE ]
 * [ PIE ] [      LINE       ]
 * 
 * https://react-chartjs-2.js.org/components/bar/
 * https://react-chartjs-2.js.org/components/line/
 * https://react-chartjs-2.js.org/components/pie/
 * 
 */

ChartJS.register(ArcElement, Tooltip, Legend);

export const Analytics = () => {
  const { data } = useData();

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

  return (
    <>
      <div className="h-full">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <Pie data={pieData} />
          </div>
          <div className="col-span-1">
            <Pie data={pieData} />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <Pie data={pieData} />
          </div>
          <div className="col-span-2">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </>
  );
};