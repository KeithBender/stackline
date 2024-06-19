import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './SalesTable.css';

const SalesTable: React.FC = () => {
  const salesData = useSelector((state: RootState) => state.sales.data);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...salesData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return salesData;
  }, [salesData, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return '';
    }
    return sortConfig.key === name ? `sorted-${sortConfig.direction}` : '';
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('weekEnding')} className={getClassNamesFor('weekEnding')}>Week Ending</th>
            <th onClick={() => requestSort('retailSales')} className={getClassNamesFor('retailSales')}>Retail Sales</th>
            <th onClick={() => requestSort('wholesaleSales')} className={getClassNamesFor('wholesaleSales')}>Wholesale Sales</th>
            <th onClick={() => requestSort('unitsSold')} className={getClassNamesFor('unitsSold')}>Units Sold</th>
            <th onClick={() => requestSort('retailerMargin')} className={getClassNamesFor('retailerMargin')}>Retailer Margin</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((sale: any, index: number) => (
            <tr key={index}>
              <td>{sale.weekEnding}</td>
              <td>{formatCurrency(sale.retailSales)}</td>
              <td>{formatCurrency(sale.wholesaleSales)}</td>
              <td>{sale.unitsSold}</td>
              <td>{formatCurrency(sale.retailerMargin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SalesTable;
