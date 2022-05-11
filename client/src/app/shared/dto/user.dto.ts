import {GOALS} from "../enum/goals.enum";

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
export interface AuthUserDTO extends UserDTO{
  _id: string,
  isAuthenticated: boolean,
}
