import React,{useRef, useEffect} from 'react';
import Chart from 'chart.js';
import styles from './LineChart.module.css';
import styleChart from './styleChart';
import {cloneDeep} from 'lodash';

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}



const LineChart = (props) => {
  const {labels, datasets, types=[], dualYAxis, axis, target} = props;
  useTraceUpdate(props);
  
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