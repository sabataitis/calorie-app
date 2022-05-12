import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../common/schemas/product";
import productsJSON from "../common/data/products.json";
import recipesJSON from "../common/data/recipes.json";
import { EnteredProduct, EnteredProductDocument } from "../common/schemas/entered-product.schema";
import { CreateProductDTO } from "../common/dto/create-product.dto";
import { Category, CategoryDocument } from "../common/schemas/category";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(EnteredProduct.name) private userProductModel: Model<EnteredProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {
  }

  async seed(): Promise<void> {
    const bulkProducts = productsJSON.map(function(product) {
        return {
          updateOne: {
            filter: { name: product.name },
            update: product,
            upsert: true,
            new: true
          }
        };
      }
    );
    const bulkRecipes = recipesJSON.map(function(recipe) {
        return {
          updateOne: {
            filter: { name: recipe.name },
            update: recipe,
            upsert: true,
            new: true
          }
        };
      }
    );
    try {
      await this.productModel.bulkWrite(bulkProducts);
      await this.productModel.bulkWrite(bulkRecipes);
    } catch (err) {
      throw new HttpException("Error Seeding Products", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(where: { field: string, value: string | number } = null): Promise<any> {
    return this.productModel.findOne(where).lean();
  }

  async findAll(userId: string, component: string) {
    switch (component) {
      case "search":
        return this.productModel.find({ $or: [{ for: null }, { for: userId }] });
      case "profile":
        return this.productModel.find({ $or: [{ for: null }, { for: userId }], isMeal: false });
      default:
        return this.productModel.find({ $or: [{ for: null }, { for: userId }] });
    }
  }

  async create(userId: string, createProductDTO: CreateProductDTO) {
    const category = await this.categoryModel.findById({ _id: createProductDTO.category });

    console.log(createProductDTO);

    const newProduct = new this.productModel({
      name: createProductDTO.name,
      category: category.name,
      for: userId,
      isMeal: createProductDTO.isMeal
    });

    let nutrients;
    let quantities;
    switch (createProductDTO.isMeal) {
      case false:
        if (createProductDTO.quantities.unit_g) {
          nutrients = {
            calories: Number(((100 * createProductDTO.nutrients.calories) / createProductDTO.quantities.unit_g).toFixed(3)),
            proteins: Number(((100 * createProductDTO.nutrients.proteins) / createProductDTO.quantities.unit_g).toFixed(3)),
            carbs: Number(((100 * createProductDTO.nutrients.carbs) / createProductDTO.quantities.unit_g).toFixed(3)),
            fats: Number(((100 * createProductDTO.nutrients.fats) / createProductDTO.quantities.unit_g).toFixed(3))
          };
          quantities = {
            quantity_g: 100,
            unit_g: createProductDTO.quantities.unit_g
          };
        } else {
          nutrients = {
            calories: Number((createProductDTO.nutrients.calories).toFixed(3)),
            proteins: Number((createProductDTO.nutrients.proteins).toFixed(3)),
            carbs: Number((createProductDTO.nutrients.carbs).toFixed(3)),
            fats: Number((createProductDTO.nutrients.fats).toFixed(3)),
          };
          quantities = createProductDTO.quantities;
        }

        newProduct.nutrients = nutrients;
        newProduct.quantities = quantities;
        break;

      case true:
        nutrients = {
          calories: Number(((100 * createProductDTO.nutrients.calories) / createProductDTO.quantities.quantity_g).toFixed(3)),
          proteins: Number(((100 * createProductDTO.nutrients.proteins) / createProductDTO.quantities.quantity_g).toFixed(3)),
          carbs: Number(((100 * createProductDTO.nutrients.carbs) / createProductDTO.quantities.quantity_g).toFixed(3)),
          fats: Number(((100 * createProductDTO.nutrients.fats) / createProductDTO.quantities.quantity_g).toFixed(3))
        };
        quantities = {
          quantity_g: 100,
          unit_g: createProductDTO.quantities.unit_g
        };

        newProduct.nutrients = nutrients;
        newProduct.quantities = quantities;
        newProduct.ingredients = createProductDTO.ingredients;
        break;
    }

    return await newProduct.save();

  }

}
