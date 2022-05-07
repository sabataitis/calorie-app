import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductService{
  constructor(private apiService: ApiService) {}
  PRODUCT_URL = 'product';

  enterProducts(payload: any): Observable<any>{
    return this.apiService.post(this.PRODUCT_URL + '/enter', payload);
  }

  findAll(): Observable<any>{
    return this.apiService.get(this.PRODUCT_URL);
  }
}
