import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartSizeDTO} from "../../../../shared/dto/chart-size.dto";

@Component({
  selector: 'calorie-app-polar-area',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.scss']
})
export class PolarAreaComponent implements OnChanges{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input('chartData') chartData: ChartData<'polarArea'>;
  @Input('chartSize') chartSize: ChartSizeDTO;

  data: ChartData<'polarArea'>;
  size: ChartSizeDTO;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['chartData'].currentValue){
      this.data = this.chartData;
      console.log(this.data);
    }
    if(changes['chartSize']){
      this.size =this.chartSize;
    }
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
