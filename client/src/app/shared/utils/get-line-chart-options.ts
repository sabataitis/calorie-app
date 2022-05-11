import {ChartOptions} from "chart.js";

export function getLineChartOptions(min: string, max: string,currentDate: string): ChartOptions {
  return {
    responsive: true,
    plugins:{
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        min: `${min}`,
        max: `${max}`,
        offset: true,
        position: 'left',
        stackWeight: 1,
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            'millisecond': 'dd MMMM YYYY HH:mm',
            'second': 'mm:ss',
            'minute': 'HH:mm',
            'hour': 'HH:mm',
            'day': 'dd MMM',
            'week': 'dd MMM',
            'month': 'dd MMMM',
            'quarter': '[Q]Q - YYYY',
            'year': 'YYYY',
          }
        },
      },
      y:{
        ticks:{
          maxTicksLimit:20
        }
      }
    }
  }
}
