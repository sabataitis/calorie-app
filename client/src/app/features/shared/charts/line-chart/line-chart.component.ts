import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartOptions, ChartType, Color} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartSizeDTO} from "../../../../shared/dto/chart-size.dto";
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'calorie-app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input('chartData') chartData: ChartData<'line'>;
  @Input('chartOptions') chartOptions: ChartOptions<'line'>;
  @Input('chartSize') chartSize: ChartSizeDTO;

  // @Input('chartSize') chartSize: ChartSizeDTO;
  size: ChartSizeDTO;
  data: ChartData<any>;
  options: ChartOptions<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']?.currentValue) {
      this.data = changes['chartData'].currentValue;
    }
    if (changes['chartSize']?.currentValue) {
      this.size = changes['chartSize'].currentValue;
    }
    if (changes['chartOptions']?.currentValue) {
      this.options = changes['chartOptions'].currentValue;
    }
  }
}
