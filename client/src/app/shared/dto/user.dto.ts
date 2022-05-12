import {GOALS} from "../enum/goals.enum";
import {ACTIVITY_FACTOR} from "../enum/activity-factor.enum";

export interface Recommendations{
  proteins: {
    from: number,
    to: number,
  },
  carbs: {
    from: number,
    to: number,
  },
  fats: {
    from: number,
    to: number,
  }
}

export interface UserDTO{
  username: string,
  gender: string,
  age: number,
  height: number,
  weight: number,
  activity: string,
  goal: GOALS,
  goalNum?: number,
  calories: number,
  recommendations: Recommendations,
  formula: string
}

export interface AuthUserDTO extends UserStatisticsDTO{
  isAuthenticated: boolean;
  _id: string;
  username: string;
}

export interface UserStatisticsDTO {
  gender: string,
  age: number,
  height: number,
  weight: number,
  activity: ACTIVITY_FACTOR,
  goal: GOALS,
  goalNum: number,
  calories: number,
  recommendations:Recommendations,
  formula: string
}
