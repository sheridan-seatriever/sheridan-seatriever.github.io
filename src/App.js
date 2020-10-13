import React,{useRef, useEffect} from 'react';
import Chart from 'chart.js';
import './App.css';
import {weeklySales} from './data';

const App = () => {

  const chartref = useRef(null);
  
  useEffect(() => {
    if(chartref && chartref.current) {
      new Chart(chartref.current, {
        type: "line",
        data: {
          labels: ["WK1", "WK2", "WK3", "WK4", "WK5", "WK6", "WK7", "WK8", "WK9", "WK10",	"WK11",	"WK12",	"WK13",	"WK14",	"WK15",	"WK16",	"WK17",	"WK18",	"WK19",	"WK20",	"WK21",	"WK22",	"WK23",	"WK24",	"WK25",	"WK26",	"WK27",	"WK28",	"WK29",	"WK30",	"WK31",	"WK32",	"WK33",	"WK34",	"WK35",	"WK36",	"WK37",	"WK38",	"WK39",	"WK40",	"WK41",	"WK42",	"WK43",	"WK44",	"WK45",	"WK46",	"WK47",	"WK48",	"WK49",	"WK50",	"WK51",	"WK52"
],
          datasets: weeklySales
        },
        options: {
        }
      });
    }    
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <canvas ref={chartref}/>
      </header>
    </div>
  );
}

export default App;
