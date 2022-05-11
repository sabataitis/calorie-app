import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartOptions, ChartType, Color} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartSizeDTO} from "../../../../shared/dto/chart-size.dto";
import {createFloatingBarChartOptions} from "../../../../shared/utils/create-floating-bar-chart-options";

@Component({
  selector: 'calorie-app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input('chartData') chartData: ChartData<any>;
  @Input('chartType') chartType: 'floating' | 'regular';
  @Input('chartSize') chartSize: ChartSizeDTO;

  size: ChartSizeDTO;
  options: ChartOptions<any>;

  data: ChartData<any>;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['chartData']?.currentValue){
      this.data = changes['chartData'].currentValue;
    }
    if(changes['chartType']?.currentValue){
      if(changes['chartType'].currentValue === 'floating'){
        this.options = createFloatingBarChartOptions();
      } else{
        this.options = {
          responsive: true,
        }
      }
    }
    if(changes['chartSize']?.currentValue){
      this.size = changes['chartSize'].currentValue;
    }
  }
}
