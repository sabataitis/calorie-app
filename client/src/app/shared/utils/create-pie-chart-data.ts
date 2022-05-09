import {ChartData} from "chart.js";

export interface DatasetType{
  label?: string,
  data: number[],
  backgroundColor?: string[]
}
export interface ChartDataType extends ChartData<'pie', number[], string>{}

export function createPieChartData(labels: string[], datasets: DatasetType[]): ChartDataType{
  return {
    labels: labels,
    datasets: datasets
  }
}
