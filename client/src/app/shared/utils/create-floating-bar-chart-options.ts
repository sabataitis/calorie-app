import {ChartOptions} from "chart.js";

export function createFloatingBarChartOptions(): ChartOptions<any>{
  return {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  }
}
