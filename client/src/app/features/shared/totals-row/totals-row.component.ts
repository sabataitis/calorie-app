import {Component, Input, OnInit} from '@angular/core';
import {TotalsDTO} from "../../../shared/dto/totals.dto";

@Component({
  selector: 'calorie-app-totals-row',
  templateUrl: './totals-row.component.html',
  styleUrls: ['./totals-row.component.scss']
})
export class TotalsRowComponent {
  @Input('totals') totals: TotalsDTO;
  @Input('size') size: 'sm' | 'md';
}
