"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDTO = void 0;
var class_validator_1 = require("class-validator");
var UserDTO = /** @class */ (function () {
    function UserDTO() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserDTO.prototype, "username");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserDTO.prototype, "password");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserDTO.prototype, "gender");
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], UserDTO.prototype, "age");
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], UserDTO.prototype, "height");
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], UserDTO.prototype, "weight");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserDTO.prototype, "activity");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserDTO.prototype, "goal");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)()
    ], UserDTO.prototype, "calories");
    return UserDTO;
}());
exports.UserDTO = UserDTO;
