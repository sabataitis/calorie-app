import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {CategoryDTO} from "../dto/category.dto";

@Injectable({providedIn: 'root'})
export class CategoryService{
  constructor(private apiService: ApiService) {}
  CATEGORY_URL = 'category';

  categories(): Observable<CategoryDTO[]>{
    return this.apiService.get(this.CATEGORY_URL);
  }

}
