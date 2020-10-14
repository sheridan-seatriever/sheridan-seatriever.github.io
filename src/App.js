import React from 'react';
import Chart from 'chart.js';
import './App.css';
import LineChart from './Components/LineChart';
import {labels, weeklySales, salesForecast, orderValue, shippedValue, forecastDemand, fillRate, ROS, storeInventory} from './data';


const App = () => {
  Chart.defaults.global.defaultFontColor='#fff';

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex_child">
          <LineChart
            labels={labels}
            datasets={[weeklySales[2018], weeklySales[2019], weeklySales[2020]]}
          />
          <LineChart
            labels={labels}
            datasets={[fillRate[2020]]}
            type={['bar']}
          />
          <LineChart
            labels={labels}
            datasets={[ROS[2018], ROS[2019], ROS[2020]]}
          />
        </div>
        <div className="flex_child">
          <LineChart 
            labels={labels}
            datasets={[storeInventory[2020], weeklySales[2020], salesForecast[2020]]}
            types={['bar']}
            dualYAxis={true}
            axis={['A', 'B', 'B']}
          />
          <LineChart 
            labels={labels}
            datasets={[shippedValue[2020], orderValue[2020], forecastDemand[2020], forecastDemand[2021]]}
            types={['bar']}
          />
          <LineChart 
            labels={labels}
            datasets={[salesForecast[2020], salesForecast[2021], weeklySales[2018], weeklySales[2019], weeklySales[2020]]}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
