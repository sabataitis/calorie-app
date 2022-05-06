"use strict";
exports.__esModule = true;
exports.BMRFormula = void 0;
function BMRFormula(gender, weight, height, age) {
    switch (gender) {
        case 'Vyras':
            return 65.4 + (13.7 * weight) + (5 * height) - (6.8 * age);
        case 'Moteris':
            return 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
}
exports.BMRFormula = BMRFormula;
