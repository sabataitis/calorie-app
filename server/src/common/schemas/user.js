"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = exports.Recommendations = exports.Recommendation = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var activity_factor_enum_1 = require("../enum/activity-factor.enum");
var goals_enum_1 = require("../enum/goals.enum");
var class_validator_1 = require("class-validator");
var Recommendation = /** @class */ (function () {
    function Recommendation() {
    }
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], Recommendation.prototype, "from");
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], Recommendation.prototype, "to");
    return Recommendation;
}());
exports.Recommendation = Recommendation;
var Recommendations = /** @class */ (function () {
    function Recommendations() {
    }
    return Recommendations;
}());
exports.Recommendations = Recommendations;
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, mongoose_1.Prop)({
            unique: true
        })
    ], User.prototype, "username");
    __decorate([
        (0, mongoose_1.Prop)()
    ], User.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)()
    ], User.prototype, "gender");
    __decorate([
        (0, mongoose_1.Prop)()
    ], User.prototype, "age");
    __decorate([
        (0, mongoose_1.Prop)()
    ], User.prototype, "height");
    __decorate([
        (0, mongoose_1.Prop)()
    ], User.prototype, "weight");
    __decorate([
        (0, mongoose_1.Prop)({ "enum": activity_factor_enum_1.ACTIVITY_FACTOR })
    ], User.prototype, "activity");
    __decorate([
        (0, mongoose_1.Prop)({ "enum": goals_enum_1.GOALS })
    ], User.prototype, "goal");
    __decorate([
        (0, mongoose_1.Prop)()
    ], User.prototype, "calories");
    __decorate([
        (0, mongoose_1.Prop)({ type: Recommendations })
    ], User.prototype, "recommendations");
    User = __decorate([
        (0, mongoose_1.Schema)()
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
