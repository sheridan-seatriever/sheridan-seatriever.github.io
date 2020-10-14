import React,{useRef, useEffect} from 'react';
import Chart from 'chart.js';
import styles from './LineChart.module.css';
import styleChart from './styleChart';
import {cloneDeep} from 'lodash';

const LineChart = ({labels, datasets, types=[], dualYAxis, axis}) => {
  
  const chartref = useRef(null);
  let datasetsClone = cloneDeep(datasets);

  let options = {};

  if(dualYAxis) {
    options = {
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
        }]
      }
    }
    for(let i=0; i<datasetsClone.length; i++) {
      datasetsClone[i].yAxisID = axis[i];
    }
  }

  useEffect(() => {
    if(chartref && chartref.current) {
      datasetsClone = styleChart(datasetsClone);
      for(let i=0; i<datasetsClone.length; i++) {
        datasetsClone[i].type = types[i] || 'line';
        datasetsClone[i].fill = false;
      }
      console.log('datasets: ', datasets);
      console.log('datasetsClone: ', datasetsClone);
      new Chart(chartref.current, {
        type: "line",
        data: {
          labels,
          datasets: datasetsClone
        },
        options
      });
    }    
  }, [datasets])

  return (
    <canvas ref={chartref} className={styles.chart}/>
  );
}

export default LineChart;