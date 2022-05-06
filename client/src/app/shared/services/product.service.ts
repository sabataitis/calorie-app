import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductService{
  constructor(private apiService: ApiService) {}
  PRODUCT_URL = 'product';

  findAll(): Observable<any>{
    return this.apiService.get(this.PRODUCT_URL);
  }
}
