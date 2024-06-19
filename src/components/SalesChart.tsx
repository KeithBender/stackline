import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { aggregateByMonth } from '../utils/aggregateByMonth';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart: React.FC = () => {
  const salesData = useSelector((state: RootState) => state.sales.data);
  const monthlyData = aggregateByMonth(salesData);

  const chartData = {
    labels: monthlyData.map(data => data.month),
    datasets: [
      {
        label: 'Retail Sales',
        data: monthlyData.map(data => data.retailSales),
        borderColor: 'blue',
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: 'Wholesale Sales',
        data: monthlyData.map(data => data.wholesaleSales),
        borderColor: 'gray',
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
  };

  return (
    <div>
      <h2 style={{textAlign: 'left', padding: '20px', fontSize: '20px'}}>Retail Sales</h2>
      <Line key={JSON.stringify(chartData)} data={chartData} options={options} />;
    </div>
  );
};

export default SalesChart;