import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {TotalsDTO} from "../../../../shared/dto/totals.dto";
import {UserProductDTO} from "../../../../shared/dto/user-product.dto";

@Component({
  selector: 'calorie-app-calorie-count-block',
  templateUrl: './calorie-count-block.component.html',
  styleUrls: ['./calorie-count-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalorieCountBlockComponent implements OnChanges {
  @Input('title') title: string;
  @Input('user') user: AuthUserDTO;
  @Input('products') products: UserProductDTO[];
  @Input('totals') totals: TotalsDTO;

  currentCalorieSum: number;

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['products']){
      this.currentCalorieSum = changes['products'].currentValue.reduce((partialSum:any, a:any) => partialSum + a.nutrients.calories, 0);
    }
  }
}
