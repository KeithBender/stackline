import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setData } from './store/salesSlice';
import SalesChart from './components/SalesChart';
import SalesTable from './components/SalesTable';
import Sidebar from './components/Sidebar';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/stackline_frontend_assessment_data_2021.json`)
      .then(response => {
        console.log("Data fetched:", response.data);
        dispatch(setData(response.data[0].sales));
        setProduct(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src="/stackline_logo.svg" alt="Stackline Logo" className="logo" />
        </div>
      </header>
      <div className="App-content">
        <div className='Sidebar'>
        {product && <Sidebar product={product} />}
        </div>
        <main>
          <div className="chart-container">
            <SalesChart />
          </div>
          <div className="table-container">
            <SalesTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;