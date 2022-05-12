import {Component, Input } from '@angular/core';
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {GOALS_LT} from "../../../../shared/enum/goals.enum";
import {ACTIVITY_FACTOR_LT} from "../../../../shared/enum/activity-factor.enum";

@Component({
  selector: 'calorie-app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input('user') user: AuthUserDTO;
  ACTIVITY_FACTOR = ACTIVITY_FACTOR_LT;
  GOALS = GOALS_LT;
}
