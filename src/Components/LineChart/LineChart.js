import React,{useRef, useEffect} from 'react';
import Chart from 'chart.js';
import styles from './LineChart.module.css';
import styleChart from './styleChart';
import {cloneDeep} from 'lodash';

const LineChart = ({labels, datasets, types=[], dualYAxis, axis, target}) => {
  
  const chartref = useRef(null);
  let datasetsClone = cloneDeep(datasets);
  let options = {};


  for(let i=0; i<datasetsClone.length; i++) {
    datasetsClone[i].type = types[i] || 'line';
    datasetsClone[i].fill = false;
  }

  if(target) {
    datasetsClone.push({
      target: true,
      label: 'TARGET',
      data: new Array(labels.length).fill(target),
    });
  }
  
  datasetsClone = styleChart(datasetsClone);


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
      console.log(datasetsClone);
      new Chart(chartref.current, {
        type: "line",
        data: {
          labels,
          datasets: datasetsClone
        },
        options
      });
    }    
  }, [datasetsClone, chartref, labels, options])

  return (
    <canvas ref={chartref} className={styles.chart}/>
  );
}

export default LineChart;