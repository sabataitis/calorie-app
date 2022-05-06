"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductSchema = exports.Product = exports.Quantities = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Quantities = /** @class */ (function () {
    function Quantities() {
    }
    return Quantities;
}());
exports.Quantities = Quantities;
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        (0, mongoose_1.Prop)({
            unique: true
        })
    ], Product.prototype, "name");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Product.prototype, "calories_100g");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Product.prototype, "proteins_100g");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Product.prototype, "carbs_100g");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Product.prototype, "fats_100g");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Product.prototype, "category");
    __decorate([
        (0, mongoose_1.Prop)({ type: Quantities })
    ], Product.prototype, "quantities");
    Product = __decorate([
        (0, mongoose_1.Schema)()
    ], Product);
    return Product;
}());
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
