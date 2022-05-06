"use strict";
exports.__esModule = true;
exports.calculateCalorieGoal = void 0;
var activity_factor_enum_1 = require("../enum/activity-factor.enum");
var bmr_formula_const_1 = require("../constants/bmr-formula.const");
var activity_factor_cont_1 = require("../constants/activity-factor.cont");
function calculateCalorieGoal(user) {
    var calories = 0;
    switch (user.activity) {
        case activity_factor_enum_1.ACTIVITY_FACTOR.SEDENTARY:
            calories = (0, bmr_formula_const_1.BMRFormula)(user.gender, user.weight, user.height, user.age) * activity_factor_cont_1.ActivityFactorConst.sedentary;
            break;
        case activity_factor_enum_1.ACTIVITY_FACTOR.LIGHT:
            calories = (0, bmr_formula_const_1.BMRFormula)(user.gender, user.weight, user.height, user.age) * activity_factor_cont_1.ActivityFactorConst.light;
            break;
        case activity_factor_enum_1.ACTIVITY_FACTOR.MODERATE:
            calories = (0, bmr_formula_const_1.BMRFormula)(user.gender, user.weight, user.height, user.age) * activity_factor_cont_1.ActivityFactorConst.moderate;
            break;
        case activity_factor_enum_1.ACTIVITY_FACTOR.HIGH:
            calories = (0, bmr_formula_const_1.BMRFormula)(user.gender, user.weight, user.height, user.age) * activity_factor_cont_1.ActivityFactorConst.high;
            break;
    }
    return Number(calories.toString().split(".")[0]);
}
exports.calculateCalorieGoal = calculateCalorieGoal;
