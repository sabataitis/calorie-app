"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var name_const_1 = require("./name.const");
var ProductController = /** @class */ (function () {
    function ProductController(productService) {
        this.productService = productService;
    }
    ProductController.prototype.seed = function () {
        return this.productService.seed();
    };
    ProductController.prototype.findAll = function () {
        return this.productService.findAll();
    };
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Post)('seed')
    ], ProductController.prototype, "seed");
    __decorate([
        (0, common_1.Get)()
    ], ProductController.prototype, "findAll");
    ProductController = __decorate([
        (0, common_1.Controller)(name_const_1.ProductDomainName)
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;
