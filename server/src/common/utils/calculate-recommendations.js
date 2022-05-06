"use strict";
exports.__esModule = true;
exports.calculateRecommendations = void 0;
function calculateRecommendations(age, calories) {
    if (age > 2 && age < 64) {
        var p_from = (calories * (10 / 100)) / 4;
        var p_to = (calories * (20 / 100)) / 4;
        var c_from = (calories * (45 / 100)) / 4;
        var c_to = (calories * (60 / 100)) / 4;
        var f_from = (calories * (25 / 100)) / 9;
        var f_to = (calories * (35 / 100)) / 9;
        var proteins_from = Number(p_from.toString().split(".")[0]);
        var proteins_to = Number(p_to.toString().split(".")[0]);
        var carbs_from = Number(c_from.toString().split(".")[0]);
        var carbs_to = Number(c_to.toString().split(".")[0]);
        var fats_from = Number(f_from.toString().split(".")[0]);
        var fats_to = Number(f_to.toString().split(".")[0]);
        return {
            proteins: {
                from: proteins_from,
                to: proteins_to
            },
            carbs: {
                from: carbs_from,
                to: carbs_to
            },
            fats: {
                from: fats_from,
                to: fats_to
            }
        };
    }
}
exports.calculateRecommendations = calculateRecommendations;
