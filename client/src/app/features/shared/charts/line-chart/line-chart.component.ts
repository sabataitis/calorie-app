import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartOptions, ChartType, Color} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartSizeDTO} from "../../../../shared/dto/chart-size.dto";

@Component({
  selector: 'calorie-app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input('chartData') chartData: ChartData<any>;
  @Input('chartSize') chartSize: ChartSizeDTO;

  data: ChartData<any>;
  size: ChartSizeDTO;

  options: ChartOptions = {
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

  ngOnChanges(changes: SimpleChanges) {
    if(changes['chartData']?.currentValue){
      this.data = changes['chartData'].currentValue;
    }
    if(changes['chartSize']?.currentValue){
      this.size = changes['chartSize'].currentValue;
    }
  }
}
