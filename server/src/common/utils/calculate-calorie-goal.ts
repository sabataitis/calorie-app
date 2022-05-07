import { UserDTO } from "../dto/user.dto";
import { ACTIVITY_FACTOR } from "../enum/activity-factor.enum";
import { BMRFormula } from "../constants/bmr-formula.const";
import { ActivityFactorConst } from "../constants/activity-factor.cont";
import { GOALS } from "../enum/goals.enum";

export function calculateCalorieGoal(user: UserDTO): number{
  let calories = 0;
  let weight=0;

  switch(user.goal){
    case GOALS.MAINTAIN:
      weight = user.weight;
      break;
    case GOALS.GAIN:
      weight = user.weight + user.goalNum;
      break;
    case GOALS.LOOSE:
      weight = user.weight - user.goalNum;
      break;
  }

  switch(user.activity){
    case ACTIVITY_FACTOR.SEDENTARY:
      calories = BMRFormula(user.gender, weight, user.height, user.age) * ActivityFactorConst.sedentary;
      break;
    case ACTIVITY_FACTOR.LIGHT:
      calories = BMRFormula(user.gender, weight, user.height, user.age) * ActivityFactorConst.light;
      break;
    case ACTIVITY_FACTOR.MODERATE:
      calories = BMRFormula(user.gender, weight, user.height, user.age) * ActivityFactorConst.moderate;
      break;
    case ACTIVITY_FACTOR.HIGH:
      calories = BMRFormula(user.gender, weight, user.height, user.age) * ActivityFactorConst.high;
      break;
  }
  return Number(calories.toString().split(".")[0]);
}
