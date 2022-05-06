"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var user_module_1 = require("../user/user.module");
var passport_1 = require("@nestjs/passport");
var local_strategy_1 = require("./strategy/local.strategy");
var jwt_1 = require("@nestjs/jwt");
var constants_1 = require("./constants");
var jwt_strategy_1 = require("./strategy/jwt.strategy");
var auth_controller_1 = require("./auth.controller");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            controllers: [auth_controller_1.AuthController],
            imports: [
                user_module_1.UserModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    // TODO move to .env
                    // TODO add refresh token for expiration of token
                    secret: constants_1.jwtConstants.secret
                })
            ],
            providers: [
                auth_service_1.AuthService,
                local_strategy_1.LocalStrategy,
                jwt_strategy_1.JwtStrategy
            ],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
