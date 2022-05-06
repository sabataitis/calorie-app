import { UserDTO } from "../dto/user.dto";
import { ACTIVITY_FACTOR } from "../enum/activity-factor.enum";
import { BMRFormula } from "../constants/bmr-formula.const";
import { ActivityFactorConst } from "../constants/activity-factor.cont";

export function calculateCalorieGoal(user: UserDTO): number{
  let calories = 0;
  switch(user.activity){
    case ACTIVITY_FACTOR.SEDENTARY:
      calories = BMRFormula(user.gender, user.weight, user.height, user.age) * ActivityFactorConst.sedentary;
      break;
    case ACTIVITY_FACTOR.LIGHT:
      calories = BMRFormula(user.gender, user.weight, user.height, user.age) * ActivityFactorConst.light;
      break;
    case ACTIVITY_FACTOR.MODERATE:
      calories = BMRFormula(user.gender, user.weight, user.height, user.age) * ActivityFactorConst.moderate;
      break;
    case ACTIVITY_FACTOR.HIGH:
      calories = BMRFormula(user.gender, user.weight, user.height, user.age) * ActivityFactorConst.high;
      break;
  }
  return Number(calories.toString().split(".")[0]);
}
