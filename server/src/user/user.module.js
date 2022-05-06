"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var user_service_1 = require("./user.service");
var mongoose_1 = require("@nestjs/mongoose");
var user_1 = require("../common/schemas/user");
var user_controller_1 = require("./user.controller");
var product_1 = require("../common/schemas/product");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        (0, common_1.Module)({
            controllers: [user_controller_1.UserController],
            imports: [mongoose_1.MongooseModule.forFeature([{ name: user_1.User.name, schema: user_1.UserSchema }, { name: product_1.Product.name, schema: product_1.ProductSchema }])],
            providers: [user_service_1.UserService],
            exports: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
