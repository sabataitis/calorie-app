"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductModule = void 0;
var common_1 = require("@nestjs/common");
var product_service_1 = require("./entered-product.service");
var mongoose_1 = require("@nestjs/mongoose");
var product_controller_1 = require("./product.controller");
var product_1 = require("../common/schemas/product");
var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        (0, common_1.Module)({
            controllers: [product_controller_1.ProductController],
            imports: [mongoose_1.MongooseModule.forFeature([{ name: product_1.Product.name, schema: product_1.ProductSchema }])],
            providers: [product_service_1.ProductService],
            exports: [product_service_1.ProductService]
        })
    ], ProductModule);
    return ProductModule;
}());
exports.ProductModule = ProductModule;
