import React,{useRef, useEffect} from 'react';
import Chart from 'chart.js';
import styles from './LineChart.module.css';
import styleChart from './styleChart';

const LineChart = ({labels, datasets, types=[]}) => {
  const chartref = useRef(null);

  useEffect(() => {
    if(chartref && chartref.current) {
      const data = styleChart(datasets);
      for(let i=0; i<data.length; i++) {
        data[i].type = types[i];
      }
      new Chart(chartref.current, {
        type: "line",
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true
        }
      });
    }    
  }, [])

  return (
    <canvas ref={chartref} className={styles.chart}/>
  );
}

export default LineChart;