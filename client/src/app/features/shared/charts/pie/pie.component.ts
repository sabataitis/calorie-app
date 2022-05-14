import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartSizeDTO} from "../../../../shared/dto/chart-size.dto";

@Component({
  selector: 'calorie-app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieComponent implements OnChanges{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input('chartData') chartData: ChartData<'pie', number[], string | string[]>;
  @Input('chartOptions') chartOptions: ChartConfiguration<"pie" & "pie", number[], string | string[]>['options'];
  @Input('chartSize') chartSize: ChartSizeDTO;

  data: ChartData<any>;
  options: ChartOptions<any>;
  size: ChartSizeDTO;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['chartData']){
      this.data = this.chartData;
    }
    if(changes['chartOptions']){
      this.options =this.chartOptions;
    }
    if(changes['chartSize']){
      this.size =this.chartSize;
    }
  }
}
