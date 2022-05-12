import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {GetProductsDTO} from "../dto/get-products.dto";
import {CreateProductDTO} from "../dto/create-product.dto";

@Injectable({providedIn: 'root'})
export class ProductService{
  constructor(private apiService: ApiService) {}
  PRODUCT_URL = 'product';

  findAll(payload: GetProductsDTO): Observable<any>{
    return this.apiService.get(this.PRODUCT_URL +`?component=${payload.options.component}`);
  }

  create(payload: CreateProductDTO): Observable<any>{
    return this.apiService.post(this.PRODUCT_URL, payload);
  }
}
